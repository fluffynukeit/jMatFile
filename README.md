# jMatFile
jBinary types for reading Matlab mat file with Javascript

## Usage
Use the MAT typeset defined in this package as you would any `jbinary` typeset.

This package includes extensive tests showing expected behavior.

Only mat file Level 5 is currently supported.

```javascript
var jBinary = require('jbinary')
var MAT = require('jMatFile')

jBinary.load('myMat.mat', MAT).then(function (binary) {
  var mat = binary.readAll
  // or equivalently
  var mat = binary.read('mat')
  // ... do stuff with mat
})
```

## Mat object format

The returned Javascript object describing the mat file has the following key
properties.  The description here does not exhaustively define the format, but 
hits the most important elements for everyday use.

* `header` - contains info from the mat file header, such as descriptive text,
endianness, and version.
* `variables` - array of objects describing each matlab variable.

Each `variable` element has the following properties:

* `name` describing the variable's name when it was saved.
* Fields `size` for array of dimension lengths, `numel` for total number of 
elements, and `empty` flag for whether the number of elements is 0.  `size` 
always has at least 2 elements.
* `value`, a 2D (or higher) array, with each dimension matching the values in
`size`. The elements of the array depend on the type of variable. 
* Flags `complex`, `logical`, `sparse`, `struct`, `object`, `global`, `cell`, 
each either `true` or `false`, indicating information about the data in the
variable.
* If the `value` can be represented as a 1D iterable array (with possibly zero
elements), the field `vector` will be present as a 1D array of elements.
* If the `value` can be represented as a scalar, the field `scalar` will be
present and contain the equivalent scalar value.  Empty matrices are not scalars.
* If the `value` can be represented as a string, the `string` field will be 
present and contain the equivalent String object.
* If the `value` is an object of a non-primitive class, the `class` field will
be present and contain the class name in string form.

## Variable types

* For real numeric types, each element is a Number.  For complex types, the 
`complex` flag is set to `true` and each element is an object with fields
`re` and `im` for real and imaginary part, respectively.
* For logical types, the `logical` flag is set to true, and each element is a 
Boolean.
* For `string` types, each element of `value` is a string of a single character.
* For `struct` types, each element is an object with fields matching the fields
of the `struct`.  The field names can be retrieved with 
`Object.getOwnPropertyNames`.  The value of each field is a `variable` with
its own `size`, flags, `value`, etc.
* For `object` types, each element is the same as with `struct`.
* For `cell` types, each element is a `variable` with its own `size`, flags, 
`value`, etc.




