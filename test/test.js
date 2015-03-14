/*jshint expr:true */
var jBinary = require('jbinary')

var MAT = require('../index.js')

describe('Scalar primitives mat file', function () {
  var jb
  var mat

  before(function (done) {
    jb = new jBinary
          .load('test/data/scalar_primitives.mat', MAT)
          .then(function (bin) {
            mat = bin.read('mat')
            done();
          }, function (err) {
            console.log(err)
          })
  })

  describe('File metadata', function () {
    it('should have defined mat', function() {
      expect(mat).to.exist
    }),
    it('should have defined header', function() {
      expect(mat.header).to.exist
    })
    it('should have correct fields', function () {
      expect(mat.header).to.have.property('descriptiveText')
      expect(mat.header).to.have.property('subsysDataOffset')
      expect(mat.header).to.have.property('version')
      expect(mat.header).to.have.property('endianIndicator')
      expect(mat.header).to.have.property('needsSwap')
    })
    it('should have expected descriptiveText', function () {
      expect(mat.header.descriptiveText).to.contain(
        'MATLAB 5.0 MAT-file, written by Octave'
      )
    })
    it('should have offset no less than 0', function () {
      expect(mat.header.subsysDataOffset).to.be.at.least(0)
    })
    it('should have correct version type', function () {
      expect(mat.header.version).to.be.a('number')
    })
    it('should have version no less than 0', function () {
      expect(mat.header.version).to.be.at.least(0)
    })
    it('should have right number of variables', function () {
      expect(mat.variables).to.have.length(5)
    })
  })

  describe('Real scalar', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('a')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[3.5]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have scalar form', function () {
      expect(v.scalar).to.eql(3.5)
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([3.5])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Complex scalar', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('complex')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[{re:2, im:3}]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.true
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have scalar form', function () {
      expect(v.scalar).to.eql({re:2, im:3})
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([{re:2, im:3}])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    }) 
  })
  
  describe('Logical scalar', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('flag')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[true]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.true
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have scalar form', function () {
      expect(v.scalar).to.eql(true)
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([true])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    }) 
  })
  
  describe('Integer scalar', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('int')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[5]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have scalar form', function () {
      expect(v.scalar).to.eql(5)
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([5])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    }) 
  })
  
  describe('Character scalar', function () {
    var v
    before(function () {
      v = mat.variables[4]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('myChar')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([['x']])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have scalar form', function () {
      expect(v.scalar).to.eql('x')
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql(['x'])
    })
    it('should have correct string form', function () {
      expect(v.string).to.eql('x')
    }) 
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })


})

describe('Row vector primitives mat file', function () {
  var jb
  var mat

  before(function (done) {
    jb = new jBinary
          .load('test/data/row_primitives.mat', MAT)
          .then(function (bin) {
            mat = bin.read('mat')
            done();
          }, function (err) {
            console.log(err)
          })
  })

  describe('File metadata', function () {
    it('should have defined mat', function() {
      expect(mat).to.exist
    }),
    it('should have defined header', function() {
      expect(mat.header).to.exist
    })
    it('should have correct fields', function () {
      expect(mat.header).to.have.property('descriptiveText')
      expect(mat.header).to.have.property('subsysDataOffset')
      expect(mat.header).to.have.property('version')
      expect(mat.header).to.have.property('endianIndicator')
      expect(mat.header).to.have.property('needsSwap')
    })
    it('should have expected descriptiveText', function () {
      expect(mat.header.descriptiveText).to.contain(
        'MATLAB 5.0 MAT-file, written by Octave'
      )
    })
    it('should have offset no less than 0', function () {
      expect(mat.header.subsysDataOffset).to.be.at.least(0)
    })
    it('should have correct version type', function () {
      expect(mat.header.version).to.be.a('number')
    })
    it('should have version no less than 0', function () {
      expect(mat.header.version).to.be.at.least(0)
    })
    it('should have right number of variables', function () {
      expect(mat.variables).to.have.length(5)
    })
  })

  describe('Real row', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('a')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[0, 0.5, 1, 1.5, 2, 2.5, 3]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,7])
      expect(v.numel).to.eql(7)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([0, 0.5, 1, 1.5, 2, 2.5, 3])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Complex row', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('complex')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[{re:1, im:2}, {re:1.5, im:2.5}, {re:2, im:3}]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.true
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,3])
      expect(v.numel).to.eql(3)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([{re:1, im:2}, {re:1.5, im:2.5}, {re:2, im:3}])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Logical row', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('flag')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[true, true, false, true, true]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.true
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,5])
      expect(v.numel).to.eql(5)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([true, true, false, true, true])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Integer row', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('int')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[-1, 0, 1, 2]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,4])
      expect(v.numel).to.eql(4)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([-1, 0, 1, 2])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Character row', function () {
    var v
    before(function () {
      v = mat.variables[4]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('myChar')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([['x', 'y', 'z']])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,3])
      expect(v.numel).to.eql(3)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql(['x', 'y', 'z'])
    })
    it('should have string form', function () {
      expect(v.string).to.eql('xyz')
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Column vector primitives mat file', function () {
  var jb
  var mat

  before(function (done) {
    jb = new jBinary
          .load('test/data/column_primitives.mat', MAT)
          .then(function (bin) {
            mat = bin.read('mat')
            done();
          }, function (err) {
            console.log(err)
          })
  })

  describe('File metadata', function () {
    it('should have defined mat', function() {
      expect(mat).to.exist
    }),
    it('should have defined header', function() {
      expect(mat.header).to.exist
    })
    it('should have correct fields', function () {
      expect(mat.header).to.have.property('descriptiveText')
      expect(mat.header).to.have.property('subsysDataOffset')
      expect(mat.header).to.have.property('version')
      expect(mat.header).to.have.property('endianIndicator')
      expect(mat.header).to.have.property('needsSwap')
    })
    it('should have expected descriptiveText', function () {
      expect(mat.header.descriptiveText).to.contain(
        'MATLAB 5.0 MAT-file, written by Octave'
      )
    })
    it('should have offset no less than 0', function () {
      expect(mat.header.subsysDataOffset).to.be.at.least(0)
    })
    it('should have correct version type', function () {
      expect(mat.header.version).to.be.a('number')
    })
    it('should have version no less than 0', function () {
      expect(mat.header.version).to.be.at.least(0)
    })
    it('should have right number of variables', function () {
      expect(mat.variables).to.have.length(5)
    })
  })

  describe('Real column', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('a')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[0], [0.5], [1], [1.5], [2], [2.5], [3]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([7,1])
      expect(v.numel).to.eql(7)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([0, 0.5, 1, 1.5, 2, 2.5, 3])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Complex column', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('complex')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[{re:1, im:2}], [{re:1.5, im:2.5}], [{re:2, im:3}]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.true
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,1])
      expect(v.numel).to.eql(3)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([{re:1, im:2}, {re:1.5, im:2.5}, {re:2, im:3}])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Logical column', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('flag')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[true], [true], [false], [true], [true]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.true
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([5,1])
      expect(v.numel).to.eql(5)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([true, true, false, true, true])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Integer column', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('int')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[-1], [0], [1], [2]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([4,1])
      expect(v.numel).to.eql(4)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql([-1, 0, 1, 2])
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Character column', function () {
    var v
    before(function () {
      v = mat.variables[4]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('myChar')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([['x'], ['y'], ['z']])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,1])
      expect(v.numel).to.eql(3)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have vector form', function () {
      expect(v.vector).to.eql(['x', 'y', 'z'])
    })
    it('should have string form', function () {
      expect(v.string).to.eql('xyz')
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('2D primitives mat file', function () {
  var jb
  var mat

  before(function (done) {
    jb = new jBinary
    .load('test/data/2d_primitives.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })

  describe('File metadata', function () {
    it('should have defined mat', function() {
      expect(mat).to.exist
    }),
    it('should have defined header', function() {
      expect(mat.header).to.exist
    })
    it('should have correct fields', function () {
      expect(mat.header).to.have.property('descriptiveText')
      expect(mat.header).to.have.property('subsysDataOffset')
      expect(mat.header).to.have.property('version')
      expect(mat.header).to.have.property('endianIndicator')
      expect(mat.header).to.have.property('needsSwap')
    })
    it('should have expected descriptiveText', function () {
      expect(mat.header.descriptiveText).to.contain(
        'MATLAB 5.0 MAT-file, written by Octave'
      )
    })
    it('should have offset no less than 0', function () {
      expect(mat.header.subsysDataOffset).to.be.at.least(0)
    })
    it('should have correct version type', function () {
      expect(mat.header.version).to.be.a('number')
    })
    it('should have version no less than 0', function () {
      expect(mat.header.version).to.be.at.least(0)
    })
    it('should have right number of variables', function () {
      expect(mat.variables).to.have.length(5)
    })
  })

  describe('Real 2D', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('a')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([[1, 1.5, 2], [2, 2.5, 3]])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,3])
      expect(v.numel).to.eql(6)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Complex 2D', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('complex')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [{re:1, im:2}, {re:1.5, im:2.5}, {re:2, im:3}],
        [{re:2, im:3}, {re:2.5, im:3.5}, {re:3, im:4}]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.true
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,3])
      expect(v.numel).to.eql(6)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Logical 2D', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('flag')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [false, false, true], 
        [false, true, false],
        [true, false, false]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.true
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,3])
      expect(v.numel).to.eql(9)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Integer 2D', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('int')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [1, 2], 
        [3, 4],
        [5, 6]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,2])
      expect(v.numel).to.eql(6)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Character 2D', function () {
    var v
    before(function () {
      v = mat.variables[4]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('myChar')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        ['a', 'b', 'c'], 
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,3])
      expect(v.numel).to.eql(9)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('3D primitives mat file', function () {
  var jb
  var mat

  before(function (done) {
    jb = new jBinary
    .load('test/data/3d_primitives.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })

  describe('File metadata', function () {
    it('should have defined mat', function() {
      expect(mat).to.exist
    }),
    it('should have defined header', function() {
      expect(mat.header).to.exist
    })
    it('should have correct fields', function () {
      expect(mat.header).to.have.property('descriptiveText')
      expect(mat.header).to.have.property('subsysDataOffset')
      expect(mat.header).to.have.property('version')
      expect(mat.header).to.have.property('endianIndicator')
      expect(mat.header).to.have.property('needsSwap')
    })
    it('should have expected descriptiveText', function () {
      expect(mat.header.descriptiveText).to.contain(
        'MATLAB 5.0 MAT-file, written by Octave'
      )
    })
    it('should have offset no less than 0', function () {
      expect(mat.header.subsysDataOffset).to.be.at.least(0)
    })
    it('should have correct version type', function () {
      expect(mat.header.version).to.be.a('number')
    })
    it('should have version no less than 0', function () {
      expect(mat.header.version).to.be.at.least(0)
    })
    it('should have right number of variables', function () {
      expect(mat.variables).to.have.length(5)
    })
  })

  describe('Real 3D', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('a')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [[1,2], [1.5,3], [2,4]], 
        [[2,4], [2.5,5], [3,6]]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,3,2])
      expect(v.numel).to.eql(12)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Complex 3D', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('complex')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [[{re:1,im:2},{re:2,im:4}], [{re:1.5,im:2.5},{re:3,im:5}], [{re:2,im:3},{re:4,im:6}]],
        [[{re:2,im:3},{re:4,im:6}], [{re:2.5,im:3.5},{re:5,im:7}], [{re:3,im:4},{re:6,im:8}]]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.true
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,3,2])
      expect(v.numel).to.eql(12)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Logical 3D', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('flag')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [[false, false], [false, false], [true, false]], 
        [[false, false], [true, false], [false, false]],
        [[true, false], [false, false], [false, false]]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.true
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,3,2])
      expect(v.numel).to.eql(18)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Integer 3D', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('int')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [[1,2], [2,4]], 
        [[3,6], [4,8]],
        [[5,10], [6,12]]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,2,2])
      expect(v.numel).to.eql(12)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })

  describe('Character 3D', function () {
    var v
    before(function () {
      v = mat.variables[4]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('myChar')
    })
    it('should have correct value', function () {
      expect(v.value).to.eql([
        [['a','b'], ['b','c'], ['c','d']], 
        [['d','e'], ['e','f'], ['f','g']],
        [['g','h'], ['h','i'], ['i','j']]
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([3,3,2])
      expect(v.numel).to.eql(18)
      expect(v.empty).to.be.false
    })
    it('should not have scalar form', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have vector form', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have string form', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Scalar struct mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/scalar_struct.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(1)
  })

  describe('Scalar structure variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('s')
    })
    it('should have correct fields and order', function () {
      expect(Object.getOwnPropertyNames(v.value[0][0])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.true
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
   it('should have correct matrix value', function () {
      expect(v.value[0][0].string.value).to.eql([['s','t','r','i','n','g','V','a','l']])
      expect(v.value[0][0].array.value).to.eql([[0, 1, 2, 3]])
      expect(v.value[0][0].struct.value[0][0].f1.value).to.eql([['s','t','r','i','n','g','2']])
      expect(v.value[0][0].struct.value[0][0].f2.value).to.eql([[0, 0.5, 1]])
      expect(v.value[0][0].complex.value).to.eql([[{re:1, im:2}]])
      expect(v.value[0][0].flagArray.value).to.eql([[true, false]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].string.vector).to.eql(['s','t','r','i','n','g','V','a','l'])
      expect(v.vector[0].array.vector).to.eql([0, 1, 2, 3])
      expect(v.vector[0].struct.vector[0].f1.vector).to.eql(['s','t','r','i','n','g','2'])
      expect(v.vector[0].struct.vector[0].f2.vector).to.eql([0, 0.5, 1])
      expect(v.vector[0].complex.vector).to.eql([{re:1, im:2}])
      expect(v.vector[0].flagArray.vector).to.eql([true, false])
    })
    it('should have correct scalar value', function () {
      expect(v.scalar.string.string).to.eql('stringVal')
      expect(v.scalar.struct.scalar.f1.string).to.eql('string2')
      expect(v.scalar.complex.scalar).to.eql({re:1, im:2})
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })


})

describe('Row vector struct mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/row_struct.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(1)
  })

  describe('Row vector structure variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('s')
    })
    it('should have correct fields and order', function () {
      expect(Object.getOwnPropertyNames(v.value[0][0])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
      expect(Object.getOwnPropertyNames(v.value[0][1])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.true
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,2])
      expect(v.numel).to.eql(2)
      expect(v.empty).to.be.false
    })
   it('should have correct matrix value', function () {
      expect(v.value[0][0].string.value).to.eql([['s','t','r','i','n','g','V','a','l']])
      expect(v.value[0][0].array.value).to.eql([[0, 1, 2, 3]])
      expect(v.value[0][0].struct.value[0][0].f1.value).to.eql([['s','t','r','i','n','g','2']])
      expect(v.value[0][0].struct.value[0][0].f2.value).to.eql([[0, 0.5, 1]])
      expect(v.value[0][0].complex.value).to.eql([[{re:1, im:2}]])
      expect(v.value[0][0].flagArray.value).to.eql([[true, false]])

      expect(v.value[0][1].string.value).to.eql([['s','t','r','i','n','g','V','a','l','2']])
      expect(v.value[0][1].array.value).to.eql([[1, 2, 3, 4]])
      expect(v.value[0][1].struct.value[0][0].f1.value).to.eql([['s','2']])
      expect(v.value[0][1].struct.value[0][0].f2.value).to.eql([[1, 1.5, 2]])
      expect(v.value[0][1].complex.value).to.eql([[{re:2, im:3}]])
      expect(v.value[0][1].flagArray.value).to.eql([[false, false]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].string.vector).to.eql(['s','t','r','i','n','g','V','a','l'])
      expect(v.vector[0].array.vector).to.eql([0, 1, 2, 3])
      expect(v.vector[0].struct.vector[0].f1.vector).to.eql(['s','t','r','i','n','g','2'])
      expect(v.vector[0].struct.vector[0].f2.vector).to.eql([0, 0.5, 1])
      expect(v.vector[0].complex.vector).to.eql([{re:1, im:2}])
      expect(v.vector[0].flagArray.vector).to.eql([true, false])

      expect(v.vector[1].string.vector).to.eql(['s','t','r','i','n','g','V','a','l','2'])
      expect(v.vector[1].array.vector).to.eql([1, 2, 3, 4])
      expect(v.vector[1].struct.vector[0].f1.vector).to.eql(['s','2'])
      expect(v.vector[1].struct.vector[0].f2.vector).to.eql([1, 1.5, 2])
      expect(v.vector[1].complex.vector).to.eql([{re:2, im:3}])
      expect(v.vector[1].flagArray.vector).to.eql([false, false])
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Column vector struct mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/column_struct.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(1)
  })

  describe('Column vector structure variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('s')
    })
    it('should have correct fields and order', function () {
      expect(Object.getOwnPropertyNames(v.value[0][0])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
      expect(Object.getOwnPropertyNames(v.value[1][0])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.true
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,1])
      expect(v.numel).to.eql(2)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0].string.value).to.eql([['s','t','r','i','n','g','V','a','l']])
      expect(v.value[0][0].array.value).to.eql([[0, 1, 2, 3]])
      expect(v.value[0][0].struct.value[0][0].f1.value).to.eql([['s','t','r','i','n','g','2']])
      expect(v.value[0][0].struct.value[0][0].f2.value).to.eql([[0, 0.5, 1]])
      expect(v.value[0][0].complex.value).to.eql([[{re:1, im:2}]])
      expect(v.value[0][0].flagArray.value).to.eql([[true, false]])

      expect(v.value[1][0].string.value).to.eql([['s','t','r','i','n','g','V','a','l','2']])
      expect(v.value[1][0].array.value).to.eql([[1, 2, 3, 4]])
      expect(v.value[1][0].struct.value[0][0].f1.value).to.eql([['s','2']])
      expect(v.value[1][0].struct.value[0][0].f2.value).to.eql([[1, 1.5, 2]])
      expect(v.value[1][0].complex.value).to.eql([[{re:2, im:3}]])
      expect(v.value[1][0].flagArray.value).to.eql([[false, false]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].string.vector).to.eql(['s','t','r','i','n','g','V','a','l'])
      expect(v.vector[0].array.vector).to.eql([0, 1, 2, 3])
      expect(v.vector[0].struct.vector[0].f1.vector).to.eql(['s','t','r','i','n','g','2'])
      expect(v.vector[0].struct.vector[0].f2.vector).to.eql([0, 0.5, 1])
      expect(v.vector[0].complex.vector).to.eql([{re:1, im:2}])
      expect(v.vector[0].flagArray.vector).to.eql([true, false])

      expect(v.vector[1].string.vector).to.eql(['s','t','r','i','n','g','V','a','l','2'])
      expect(v.vector[1].array.vector).to.eql([1, 2, 3, 4])
      expect(v.vector[1].struct.vector[0].f1.vector).to.eql(['s','2'])
      expect(v.vector[1].struct.vector[0].f2.vector).to.eql([1, 1.5, 2])
      expect(v.vector[1].complex.vector).to.eql([{re:2, im:3}])
      expect(v.vector[1].flagArray.vector).to.eql([false, false])
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Matrix struct mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/2d_struct.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(1)
  })

  describe('2D structure variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('s')
    })
    it('should have correct fields and order', function () {
      expect(Object.getOwnPropertyNames(v.value[0][0])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
      expect(Object.getOwnPropertyNames(v.value[1][0])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
      expect(Object.getOwnPropertyNames(v.value[0][1])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
      expect(Object.getOwnPropertyNames(v.value[1][1])).to.eql([
        'string', 'array', 'struct', 'complex', 'flagArray'
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.true
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,2])
      expect(v.numel).to.eql(4)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0].string.value).to.eql([['s','t','r','i','n','g','V','a','l']])
      expect(v.value[0][0].array.value).to.eql([[0, 1, 2, 3]])
      expect(v.value[0][0].struct.value[0][0].f1.value).to.eql([['s','t','r','i','n','g','2']])
      expect(v.value[0][0].struct.value[0][0].f2.value).to.eql([[0, 0.5, 1]])
      expect(v.value[0][0].complex.value).to.eql([[{re:1, im:2}]])
      expect(v.value[0][0].flagArray.value).to.eql([[true, false]])

      expect(v.value[1][0].string.value).to.eql([['s','t','r','i','n','g','V','a','l','2']])
      expect(v.value[1][0].array.value).to.eql([[1, 2, 3, 4]])
      expect(v.value[1][0].struct.value[0][0].f1.value).to.eql([['s','2']])
      expect(v.value[1][0].struct.value[0][0].f2.value).to.eql([[1, 1.5, 2]])
      expect(v.value[1][0].complex.value).to.eql([[{re:2, im:3}]])
      expect(v.value[1][0].flagArray.value).to.eql([[false, false]])

      expect(v.value[0][1].string.value).to.eql([['d','1']])
      expect(v.value[0][1].array.value).to.eql([[0]])
      expect(v.value[0][1].struct.value[0][0].g1.value).to.eql([['d','1']])
      expect(v.value[0][1].struct.value[0][0].g2.value).to.eql([[1, 2]])
      expect(v.value[0][1].complex.value).to.eql([[{re:2, im:3}, {re:3, im:3}]])
      expect(v.value[0][1].flagArray.value).to.eql([[true]])

      expect(v.value[1][1].string.value).to.eql([[0]])
      expect(v.value[1][1].array.value).to.eql([['d', '2']])
      expect(v.value[1][1].struct.value[0][0].h1.value).to.eql([['d','2']])
      expect(v.value[1][1].struct.value[0][0].h2.value).to.eql([['f','i','e','l','d','V','a','l']])
      expect(v.value[1][1].complex.value).to.eql([[{re:0, im:1}]])
      expect(v.value[1][1].flagArray.value).to.eql([[false]])
    })
    it('should not have vector value', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Sparse matrices mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/sparse.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(4)
  })

  describe('2D sparse variable', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('sp_matrix')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.true
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([5,4])
      expect(v.numel).to.eql(20)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[1][0]).to.eql(1.5)
      expect(v.value[2][0]).to.eql(4)
      expect(v.value[4][3]).to.eql(8)
    })
    it('should not have vector value', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Row vector sparse variable', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('sp_row')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.true
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,5])
      expect(v.numel).to.eql(5)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][2]).to.eql(4.3)
      expect(v.value[0][4]).to.eql(6.2)
    })
    it('should not have vector value', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Column vector sparse variable', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('sp_column')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.true
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([5,1])
      expect(v.numel).to.eql(5)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[2][0]).to.eql(4.3)
      expect(v.value[4][0]).to.eql(6.2)
    })
    it('should not have vector value', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Scalar sparse variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('sp_scalar')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.true
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0]).to.eql(5)
    })
    it('should not have vector value', function () {
      expect(v.vector).to.not.exist
    })
    it('should have correct scalar value', function () {
      expect(v.scalar).to.eql(5)
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Cell matrices mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/cell.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(4)
  })

  describe('2D cell variable', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('cell_matrix')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.true
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,2])
      expect(v.numel).to.eql(4)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0].value).to.eql([[1]])
      expect(v.value[0][1].value).to.eql([[5.5, 6, 7]])
      expect(v.value[1][0].value).to.eql([['s','t','r','i','n','g']])
      expect(v.value[1][1].value).to.eql([[{}]])
    })
    it('should not have vector value', function () {
      expect(v.vector).to.not.exist
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Row vector cell variable', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('cell_row')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.true
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,2])
      expect(v.numel).to.eql(2)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0].value).to.eql([[1]])
      expect(v.value[0][1].value).to.eql([[5, 6, 7]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].vector).to.eql([1])
      expect(v.vector[1].vector).to.eql([5, 6, 7])
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Column vector cell variable', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('cell_column')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.true
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([2,1])
      expect(v.numel).to.eql(2)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0].value).to.eql([[1]])
      expect(v.value[1][0].value).to.eql([[5, 6, 7]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].vector).to.eql([1])
      expect(v.vector[1].vector).to.eql([5, 6, 7])
    })
    it('should not have scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  
  describe('Scalar cell variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('cell_scalar')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.true
      expect(v.object).to.be.false
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value[0][0].value).to.eql([[1]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].vector).to.eql([1])
    })
    it('should have correct scalar value', function () {
      expect(v.scalar.scalar).to.eql(1)
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})

describe('Object mat file', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/object.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(1)
  })
  describe('Object variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('obj')
    })
    it('should have correct properties and order', function () {
      expect(Object.getOwnPropertyNames(v.value[0][0])).to.eql([
        // lti is a superclass, so why does it end up in the list of property
        // names?
        'a', 'b', 'c', 'd', 'e', 'stname', 'scaled', 'lti'
      ])
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.true
    })
    it('should have correct dimensions', function () {
      expect(v.size).to.eql([1,1])
      expect(v.numel).to.eql(1)
      expect(v.empty).to.be.false
    })
   it('should have correct matrix value', function () {
      expect(v.value[0][0].a.value).to.eql([[]])
      expect(v.value[0][0].b.value).to.eql([[]])
      expect(v.value[0][0].c.value).to.eql([[]])
      expect(v.value[0][0].d.value).to.eql([[1]])
      expect(v.value[0][0].e.value).to.eql([[]])
      expect(v.value[0][0].stname.value).to.eql([[]])
      expect(v.value[0][0].scaled.value).to.eql([[false]])
    })
    it('should have correct vector value', function () {
      expect(v.vector[0].a.vector).to.eql([])
      expect(v.vector[0].b.vector).to.eql([])
      expect(v.vector[0].c.vector).to.eql([])
      expect(v.vector[0].d.vector).to.eql([1])
      expect(v.vector[0].e.vector).to.eql([])
      expect(v.vector[0].stname.vector).to.eql([])
      expect(v.vector[0].scaled.vector).to.eql([false])
    })
    it('should have correct scalar value', function () {
      expect(v.scalar.a.scalar).to.eql(undefined)
      expect(v.scalar.b.scalar).to.eql(undefined)
      expect(v.scalar.c.scalar).to.eql(undefined)
      expect(v.scalar.d.scalar).to.eql(1)
      expect(v.scalar.e.scalar).to.eql(undefined)
      expect(v.scalar.stname.scalar).to.eql(undefined)
      expect(v.scalar.scaled.scalar).to.eql(false)
    })
    it('should not have string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.eql('ss')
    })
  })
})

describe('Empty values tests', function () {
  var jb
  var mat
  before(function (done) {
    jb = new jBinary
    .load('test/data/empty.mat', MAT)
    .then(function (bin) {
      mat = bin.read('mat')
      done();
    }, function (err) {
      console.log(err)
    })
  })
  it('should have correct number of variables', function () {
    expect(mat.variables).to.have.length(6)
  })
  describe('Empty numeric variable', function () {
    var v
    before(function () {
      v = mat.variables[0]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('num')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value).to.eql([[]])
    })
    it('should have correct vector value', function () {
      expect(v.vector).to.eql([])
    })
    it('should have no scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have no string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  }) 
  describe('Empty logical variable', function () {
    var v
    before(function () {
      v = mat.variables[1]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('logical')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.true
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value).to.eql([[]])
    })
    it('should have correct vector value', function () {
      expect(v.vector).to.eql([])
    })
    it('should have no scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have no string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  }) 
  describe('Empty string variable', function () {
    var v
    before(function () {
      v = mat.variables[2]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('string')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value).to.eql([[]])
    })
    it('should have correct vector value', function () {
      expect(v.vector).to.eql([])
    })
    it('should have no scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have no string value', function () {
      expect(v.string).to.eql('')
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Empty struct variable with fields', function () {
    var v
    before(function () {
      v = mat.variables[3]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('struct')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.true
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value).to.eql([[]])
    })
    it('should have correct vector value', function () {
      expect(v.vector).to.eql([])
    })
    it('should have no scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have no string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Empty struct variable with no fields', function () {
    var v
    before(function () {
      v = mat.variables[4]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('structNoFields')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.true
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.false
      expect(v.object).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value).to.eql([[]])
    })
    it('should have correct vector value', function () {
      expect(v.vector).to.eql([])
    })
    it('should have no scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have no string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
  describe('Empty cell variable', function () {
    var v
    before(function () {
      v = mat.variables[5]
    })
    it('should have correct name', function () {
      expect(v.name).to.equal('cell')
    })
    it('should have correct flags', function () {
      expect(v.complex).to.be.false
      expect(v.logical).to.be.false
      expect(v.global).to.be.false
      expect(v.struct).to.be.false
      expect(v.sparse).to.be.false
      expect(v.cell).to.be.true
      expect(v.object).to.be.false
    })
    it('should have correct matrix value', function () {
      expect(v.value).to.eql([[]])
    })
    it('should have correct vector value', function () {
      expect(v.vector).to.eql([])
    })
    it('should have no scalar value', function () {
      expect(v.scalar).to.not.exist
    })
    it('should have no string value', function () {
      expect(v.string).to.not.exist
    })
    it('should not have class', function () {
      expect(v.class).to.not.exist
    })
  })
})





