'use strict';

const chai = require('chai');
chai.use(require('..'));
const expect = chai.expect;

describe('chai-json', () => {
  describe('basic usage', () => {
    describe('simple JSON formatted strings should pass', () => {
      it('should accept an empty object', () => expect('{}').to.be.json);
      it('should accept an empty array', () => expect('[]').to.be.json);
      it('should accept a simple object', () => expect('{"a":1}').to.be.json);
      it('should accept a simple array', () => expect('[1,2,3]').to.be.json);
    });

    describe('primitives', () => {
      it('should accept null', () => expect(null).to.be.json);
      it('should accept numbers', () => {
        expect(0).to.be.json;
        expect(0.42).to.be.json;
      });
      it('should accept booleans', () => {
        expect(true).to.be.json;
        expect(false).to.be.json;
      });
      it('should reject undefined', () => expect(undefined).not.to.be.json);
      it('should reject an empty object', () => expect({}).to.be.empty.and.not.be.json);
      it('should reject an empty array', () => expect([]).to.be.empty.and.not.be.json);
    });

    describe('incorrectly formatted JSON should not pass', () => {
      it('should reject non-json strings', () => {
        expect('').to.be.empty.and.not.be.json;
        expect('this').not.to.be.json;
        expect('json').not.to.be.json;
        expect('{a:1}').not.to.be.json;
        expect('[a:1]').not.to.be.json;
      });
      it('should reject with the parse error', () => expect(() => expect('not json').to.be.json).to.throw(Error,
        'expected \'not json\' to be a JSON formatted string, but got Unexpected token o in JSON at position 1'));
    });
  });
});
