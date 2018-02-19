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
      it('should reject with the parse error', () => expect(() => expect('not json').to.be.json)
        .to.throw(Error, /^expected 'not json' to be a JSON formatted string, but got Unexpected token /));
    });
  });

  describe('updates the context to the JSON', () => {
    describe('when successfully parsed allows for further chained assertions', () => {
      describe('simple JSON formatted strings', () => {
        it('should accept an empty object', () => expect('{}').to.be.json.and.to.be.empty);
        it('should accept an empty array', () => expect('[]').to.be.json.and.to.be.empty);
        it('should accept a simple object', () => expect('{"a":1}').to.be.json.and.an('object').with.property('a', 1));
        it('should accept a simple array', () => expect('[1,2,3]').to.be.json.and.be.an('array').that.has.lengthOf(3));
      });

      describe('more complicated examples', () => {
        const obj = {
          some: 'text',
          aNum: 42,
          anArray: [1, 2, 'text'],
          nestedObj: {
            blah: 'stuff'
          }
        };
        it('should work with own items', () =>
          expect(JSON.stringify(obj)).to.be.json.that.has.own.property('aNum', 42));
        it('should work with nested items', () =>
          expect(JSON.stringify(obj)).to.be.json.that.has.nested.property('anArray[2]', 'text'));
        it('should be reflexive', () => expect(JSON.stringify(obj)).to.be.json.that.deep.equals(obj));

        describe('ridiculously nested example that should never be seen in real life', () => {
          const nested = {
            id: 3,
            name: 'stupid',
            json: JSON.stringify(obj)
          };
          it('should handle nested json', () => expect(JSON.stringify(nested))
            .to.be.json.and.to.include({ id: 3, name: 'stupid' }).and.have.property('json')
            .which.is.json.and.deep.equals(obj));
        });
      });
    });

    describe('when unsuccessfully parsed fails gracefully', () => {
      const badJSON = '{"a":"val","not":{"closed:"properly"';
      it('should reject with the parse error', () => expect(
        () => expect(badJSON).to.be.json.with.property('a', 'val'))
        .to.throw(Error,
          new RegExp(`^expected \'${badJSON}\' to be a JSON formatted string, but got Unexpected token p`)));
    });
  });
});
