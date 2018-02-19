'use strict';

module.exports = function chaiJSON(chai) {
  const Assertion = chai.Assertion;

  Assertion.addProperty('json', function json() {
    let err = false;

    try {
      JSON.parse(this._obj);
    } catch (e) {
      err = e;
    }

    this.assert(
      !err,
      'expected #{this} to be a JSON formatted string, but got ' + err.message,
      'expected #{this} not to be a JSON formatted string'
    );
  });
};
