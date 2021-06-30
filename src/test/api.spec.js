const environment = require('../environments.js')
var assert = require('assert');

describe('Yukon Student Financial Portal API', function () {
  before(function (done) {
    doSomethingAsynchronous(done);
  });

  beforeEach(function () {
    // all your tests can now use this value
    this.name = aRandomName();
  });

  describe('Test API Connection', function () {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    describe("GET /dogs/:breed", () => {

    })
  })



  /*
  it('should do great things in life and love', function (done) {
    // the `done` callback's first argument is considered an error
    // so the test will fail if `done` receives a truthy first argument
    testSomethingAsynchronous()
    .then(function (data) {
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });
  */
});