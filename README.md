# chai-json
A plugin to add support for JSON formatted strings to the `chai` assertion library.

## Installation
Just like any other `chai` plugin:
```
const chai = require('chai');
chai.use(require('chai-json');
chai.should();

'{"some":"json"}'.should.be.json;
```

## Usage
### Is something JSON
The most basic usage as shown in the previous section, is to simply check that a value is acceptable JSON. This will pass if the value is correctly formatted, otherwise it will fail with an indication of the position of the first error:
```
expect('not proper json').to.be.json;
// AssertionError: expected 'not proper json' to be a JSON formatted string, but got Unexpected token o in JSON at position 1
```

### Chain more assertions
Adding the `json` property parses the item being tested. The result of any successful test updates the `chai` context object, allowing more assertions to follow:
```
const obj = {
  some: 'text',
  aNum: 42,
  anArray: [1, 2, 'text'],
  nestedObj: {
    blah: 'stuff'
  }
};

expect(JSON.stringify(obj)) // context is a JSON formatted string
  .to.be.json               // context updated the parsed object
  .that.has.nested.property('anArray[2]', 'text');

expect(JSON.stringify(obj)).to.be.json.that.deep.equals(obj);
```

### Test case
See the [unit tests](https://github.com/RobinKnipe/chai-json/blob/master/test/chai-json.specs.js) for more examples!

## Acknowledgements
`JSON.parse` intergrated into the `chai` assertion library.
