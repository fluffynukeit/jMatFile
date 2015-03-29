
var jBinary = require('jbinary')

// spec taken from 2014b matlab doc

// Level 5 miMatrix interpretation

var classLkup = [
  'Reserved0',
  'mxCELL_CLASS',
  'mxSTRUCT_CLASS',
  'mxOBJECT_CLASS',
  'mxCHAR_CLASS',
  'mxSPARSE_CLASS',
  'mxDOUBLE_CLASS',
  'mxSINGLE_CLASS',
  'mxINT8_CLASS',
  'mxUINT8_CLASS', 
  'mxINT16_CLASS',
  'mxUINT16_CLASS',
  'mxINT32_CLASS',
  'mxUINT32_CLASS',
  'mxINT64_CLASS', 
  'mxUINT64_CLASS'
]

var bytes2String = function (bytes) {
  var str = ''
  for (var i = 0; i < bytes.length && bytes[i] !== 0; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return str
}

var matrix = function (start, step, sizesRem, extractor) {
  // determine what operation we need to perform.  Either retrieving data or
  // recursing down dimensions further
  var doSomething = (sizesRem.length === 1) ? extractor : matrix
  var thisDim = sizesRem[0]
  var retArray = new Array(thisDim)
  for (var i = 0; i < retArray.length; i++) {
    retArray[i] = doSomething(start + i*step, 
                              step*thisDim,
                              sizesRem.slice(1), 
                              extractor)
  }
  return retArray
}


var numeric = function (re, im, size, logical, complex) {

  var mkExtractor = function () {
    if (logical)      { return function (pos) { return Boolean(re[pos])} }
    else if (complex) { return function (pos) { return {re:re[pos], im:im[pos]} } }
    else              { return function (pos) { return re[pos]} }
  }
  
  var ex = mkExtractor()
  return matrix(0, 1, size, ex)
}

var character = function (data, size) {
  var ex = function (pos) { return String.fromCharCode(data[pos]) }
  return matrix(0, 1, size, ex)
}

var structure = function(size, nameLength, fieldNames, fieldValues) {
  // Field names are concatenated together in a single string with padding in
  // between so that each is nameLength
  var fieldNameArr = new Array(fieldNames.length/nameLength)
  for (var i = 0; i < fieldNameArr.length; i++) {
    var fieldName = bytes2String(fieldNames.subarray(i*nameLength, (i+1)*nameLength))
    fieldNameArr[i] = fieldName
  }
  // With the field names collected, we can build the extractor function
  var ex = function (pos) {
    var struct = {}
    for (var i = 0; i < fieldNameArr.length; i++) {
      var index = pos*fieldNameArr.length + i
      struct[fieldNameArr[i]] = fieldValues[index]
    }
    return struct
  }
  return matrix(0, 1, size, ex)
}

// NOTE: sparse matrices are always 2D and numeric
var sparse = function (rowInfo, colInfo, re, im) {
  var mat = {}
  var getVal
  if (im) {
    getVal = function (ind) { return {re:re[ind], im:im[ind]} }
  } else {
    getVal = function (ind) { return re[ind] }
  }

  // Assume the matrix has dimension nr x nc
  for (var col = 0; col < colInfo.length-1; col++) {
    // Col info has length nc + 1.  Each value in colInfo is an index in the
    // rowInfo, re, and im arrays.
    for (var rowInd = colInfo[col]; rowInd < colInfo[col+1]; rowInd++) {
      // The row of the matrix value is given by the entry in the rowInfo array
      // looked up by the colInfo entry.  This row and all entries in rowInfo
      // before the next entry in colInfo are associated with the same row.
      var row = rowInfo[rowInd]
      if (!mat[row]) {
        mat[row] = {} // initialize as empty object if not done yet
      }
      mat[row][col] = getVal(rowInd)
    }
  }
  return mat
}

var cell = function (size, matrixArray) {
  // Cell arrays are just like real numeric arrays except that each element is
  // of type miMatrix instead of a numeric primitive

  var ex = function (pos) { return matrixArray[pos] }

  return matrix(0, 1, size, ex)
}

var interpMiMatrix = function (raw) {
  var miMat = {}
  /*jslint bitwise: true */
  var arrFlags = raw[0].data[0]
  miMat.complex = Boolean(arrFlags & 0x0800)
  miMat.global = Boolean(arrFlags & 0x0400)
  miMat.logical = Boolean(arrFlags & 0x0200)
  miMat.struct = false
  miMat.sparse = false
  miMat.cell = false
  miMat.object = false
  var classVal = arrFlags & 0xFF
  var matClass = classLkup[classVal]

  // Size is small, so the convenience of a normal array makes sense
  miMat.size = Array.prototype.slice.call(raw[1].data)
  miMat.numel = miMat.size.reduce(function (a,b) { return a*b })
  // Convention: scalars cannot be empty, but vectors can be
  var isScalar = miMat.numel === 1 
  var isVector = miMat.size.length === 2 && 
                 (miMat.size[0] <= 1 || miMat.size[1] <= 1)
  miMat.empty = miMat.numel === 0
  miMat.name = bytes2String(raw[2].data)

  // With standard stuff out of the way, interpret the class
  switch (matClass) {
    case 'mxSPARSE_CLASS':
      // do sparse format here
      miMat.value = sparse(raw[3].data, 
                           raw[4].data, 
                           raw[5].data, 
                           raw[6] && raw[6].data || undefined) 
      miMat.sparse = true
      break;
    case 'mxCHAR_CLASS':
      // do string format here
      miMat.value = character(raw[3].data, miMat.size)
      if (isVector) { // Note: a scalar is always a vector also
        miMat.string = bytes2String(raw[3].data)
      }
      break;
    case 'mxCELL_CLASS':
      // do cell format here
      var cellValues = raw.splice(3).map(function (a) { return a.data[0] })
      miMat.value = cell(miMat.size, cellValues)
      miMat.cell = true
      break;
    case 'mxSTRUCT_CLASS':
      // do struct here
      var fieldValues = raw.slice(5).map(function (a) { return a.data[0] })
      var fieldNameLength = raw[3].data[0]
      var fieldNames = raw[4].data
      miMat.value = structure(miMat.size, fieldNameLength, fieldNames, fieldValues)
      miMat.struct = true
      break;
    case 'mxOBJECT_CLASS':
      // do object here
      // objects have the same format as structs except they also have a class
      // name
      miMat.class = bytes2String(raw[3].data)
      miMat.object = true
      var propValues = raw.slice(6).map(function (a) { return a.data[0] })
      var propNameLength = raw[4].data[0]
      var propNames = raw[5].data
      miMat.value = structure(miMat.size, propNameLength, propNames, propValues)
      break;
    default:
      // it's a numeric array
      miMat.value = numeric(raw[3].data, 
                            raw[4] && raw[4].data || undefined, 
                            miMat.size, miMat.logical, miMat.complex)
  }

  // Ensure that the value is at least 2D.  Result could be empty 1D here if 
  // first dimension is 0, such as with empty arrays
  if (miMat.value.length === 0) {
    miMat.value = [miMat.value]
  }

  // Convert the value to scalar or vector if appropriate
  if (isScalar) {
    miMat.scalar = miMat.value[0][0]
  }
  if (isVector && !miMat.sparse) {
    // the vector property is used as an iterable array along either row or 
    // column vectors.  Sparse vectors are not allowed because, presumably, their
    // being sparse means storing them as an iterable array takes too much 
    // memory
    miMat.vector = 
      (miMat.empty) ? [] : 
      (miMat.size[0] === 1) ? miMat.value[0] 
                            : miMat.value.map( function (cv) { return cv[0] })
  }
  return miMat
  /*jslint bitwise: false */
}

var matConfig = {
  'jBinary.all': 'mat',
  header: { 
    descriptiveText: ['string0', 116],
    subsysDataOffset: 'uint64',
    version: 'int16',
    endianIndicator: ['string', 2],
    needsSwap: function (ctx) {
      return ctx.endianIndicator !== 'MI'
    }
  },

  miINT8: 'int8',
  miUINT8: 'uint8',
  miINT16: 'int16',
  miUINT16: 'uint16',
  miINT32: 'int32',
  miUINT32: 'uint32',
  miSINGLE: 'float',
  miDOUBLE: 'double',
  miINT64: 'int64',
  miUINT64: 'uint64',
  miUTF8: ['string', 'numBytes'],
  miMATRIX: jBinary.Template({
    baseType: ['bitLengthArray', 'dataElement', function (ctx) {
      return ctx.tag.numBytes // read data elements to end of miMATRIX
    }],
    read: function () {
      var rawMiMatrix = this.baseRead()
      return interpMiMatrix(rawMiMatrix)
    }
  }),

  tag: {
    type: ['enum', 'uint16', [
           'Reserved0',
           'miINT8',
           'miUINT8',
           'miINT16', 
           'miUINT16', 
           'miINT32', 
           'miUINT32',
           'miSINGLE',
           'Reserved8',
           'miDOUBLE',
           'Reserved10',
           'Reserved11',
           'miINT64', 
           'miUINT64',
           'miMATRIX',
           'miCOMPRESSED',
           'miUTF8',
           'miUTF16',
           'miUTF32'
           ]
          ],
    t16: 'uint16',
    smallFormat: function (ctx) {
      return ctx.t16 > 0
    },
    numBytes: function (ctx) {
      if (ctx.smallFormat) {
        return ctx.t16
      } else {
        return this.binary.read('uint32')
      }
    }
  },

  tagData: jBinary.Template({
      baseType: ['array', 'type'],
      read: function (ctx) {
        var elems = []
        var view = this.binary.view
        var b = view.buffer
        var s = view.tell()
        var l = ctx.tag.numBytes
        // length used (m) should never cause reading outside of buffer length
        var m = (s + l > view.byteLength) ? view.byteLength - s : l
        switch (ctx.tag.type) {
          // If the underlying data can be mapped to a typed array, do it and
          // skip ahead in buffer.  Huge processing savings for big arrays.
          case 'miINT8':  elems = new Int8Array(b,s,m);       view.skip(m); break;
          case 'miUINT8': elems = new Uint8Array(b,s,m);      view.skip(m); break; 
          case 'miINT16': elems = new Int16Array(b,s,m/2);    view.skip(m); break;
          case 'miUINT16':elems = new Uint16Array(b,s,m/2);   view.skip(m); break;
          case 'miINT32': elems = new Int32Array(b,s,m/4);    view.skip(m); break;
          case 'miUINT32':elems = new Uint32Array(b,s,m/4);   view.skip(m); break;
          case 'miSINGLE':elems = new Float32Array(b,s,m/4);  view.skip(m); break;
          case 'miDOUBLE':elems = new Float64Array(b,s,m/8);  view.skip(m); break;

          default: 
            while (view.tell() < s + m) {
              elems.push(this.binary.read(ctx.tag.type))
            }
        } 
        return elems
      }
  }),

  dataElement: {
    tag: 'tag',
    data: 'tagData',
    // Add padding so mat file data elements fall on 64 bit boundaries
    _padding: ['skip', function () {
      return (8 - this.binary.tell() % 8) % 8
    }]

  },

  bitLengthArray: jBinary.Template({
    params: ['element', 'sizeFn'],
    setParams: function () { this.baseType = ['array', this.element] },
    read: function (ctx) {
      var items = []
      var view = this.binary.view
      var startPos = view.tell()
      var len = this.sizeFn(ctx)
      while (view.tell() < startPos + len && view.tell() < view.byteLength) {
        items.push(this.binary.read(this.element))
      }
      return items
    }
  }),

  variable: jBinary.Template({
    baseType: {
      tag: 'tag',
      data: 'miMATRIX'
    },
    read: function () {
      return this.baseRead().data
    }
  }),

  mat: {
    header: 'header',
    _setEndian: function (ctx) {
      this.view._littleEndian = ctx.header.needsSwap
    },
    variables: ['bitLengthArray', 'variable', function () {
      var view = this.binary.view
      return view.byteLength - view.tell() // read elements to end of file (end of view)
    }]
  }
}

module.exports = matConfig


