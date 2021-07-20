//const environment = require('../../environments.js')
var assert = require('assert');
const request = require('supertest')

describe('Yukon Student Financial Portal API', function () {
  /*
  before(function (done) {
    //doSomethingAsynchronous(done);
  });

  beforeEach(function () {
    // all your tests can now use this value
    this.name = aRandomName();
  });

  it('should throw errors', () => {
    throw ({ message: 'error thrown' });
  });
  */


  describe('Test API Connection', function () {


    // METHOD /RequestStatusCorrs
    describe("/RequestStatusCorrs", () => {
      describe("GET /RequestStatusCorrs", () => {
        it('Get all records', () => {
          return (done) => {
            request
              .get('/RequestStatusCorrs')
              .expect(200)
              .then((response)=>{
                console.log(response.body)
                expect(response.body).to.have.property('version')
                //expect(res.body).to.have.property('version')
                //expect(res.body.version).to.be.a.string
                //expect(res.body.version).to.equal('1.0.0')
            
                return done();
              })
              .catch((error) => expect(error).to.be.undefined)
          };
        });
      })

      describe("POST /RequestStatusCorrs", () => {

      })

      describe("PUT /RequestStatusCorrs", () => {

      })

      describe("DELETE /RequestStatusCorrs", () => {

      })
    })


    // METHOD /RequestTypes
    describe("/RequestTypes", () => {
      describe("GET /RequestTypes", () => {
        it('Get all records', () => {
          return (done) => {
            request
              .get('/RequestTypes')
              .expect(200)
              .end((error, response)=>{
                return done();
              });
          };
        });
      })

      describe("POST /RequestTypes", () => {

      })

      describe("PUT /RequestTypes", () => {

      })

      describe("DELETE /RequestTypes", () => {

      })
    })


    // METHOD /RequestTypes
    describe("/RequirementMets", () => {
      describe("GET /RequirementMets", () => {

      })

      describe("POST /RequirementMets", () => {

      })

      describe("PUT /RequirementMets", () => {

      })

      describe("DELETE /RequirementMets", () => {

      })
    })


    // METHOD /RequirementTypes
    describe("/RequirementTypes", () => {
      describe("GET /RequirementTypes", () => {

      })

      describe("POST /RequirementTypes", () => {

      })

      describe("PUT /RequirementTypes", () => {

      })

      describe("DELETE /RequirementTypes", () => {

      })
    })
    


    // METHOD /Residences
    describe("/Residences", () => {
      describe("GET /Residences", () => {

      })

      describe("POST /Residences", () => {

      })

      describe("PUT /Residences", () => {

      })

      describe("DELETE /Residences", () => {

      })
    })


    // METHOD /SfaDocumentLinks
    describe("/SfaDocumentLinks", () => {
      describe("GET /SfaDocumentLinks", () => {

      })

      describe("POST /SfaDocumentLinks", () => {

      })

      describe("PUT /SfaDocumentLinks", () => {

      })

      describe("DELETE /SfaDocumentLinks", () => {

      })
    })


    // METHOD /SfaDocumentLinks
    describe("/SpouseTaxRates", () => {
      describe("GET /SpouseTaxRates", () => {

      })

      describe("POST /SpouseTaxRates", () => {

      })

      describe("PUT /SpouseTaxRates", () => {

      })

      describe("DELETE /SpouseTaxRates", () => {

      })
    })

    // METHOD /SpouseTaxRates
    describe("/SpouseTaxRates", () => {
      describe("GET /SpouseTaxRates", () => {

      })

      describe("POST /SpouseTaxRates", () => {

      })

      describe("PUT /SpouseTaxRates", () => {

      })

      describe("DELETE /SpouseTaxRates", () => {

      })
    })


    // METHOD /StaLookups
    describe("/StaLookups", () => {
      describe("GET /StaLookups", () => {

      })

      describe("POST /StaLookups", () => {

      })

      describe("PUT /StaLookups", () => {

      })

      describe("DELETE /StaLookups", () => {

      })
    })

    // METHOD /StandardOfLivings
    describe("/StandardOfLivings", () => {
      describe("GET /StandardOfLivings", () => {

      })

      describe("POST /StandardOfLivings", () => {

      })

      describe("PUT /StandardOfLivings", () => {

      })

      describe("DELETE /StandardOfLivings", () => {

      })
    })
 

     // METHOD /Statuss
    describe("/Statuss", () => {
      describe("GET /Statuss", () => {

      })

      describe("POST /Statuss", () => {

      })

      describe("PUT /Statuss", () => {

      })

      describe("DELETE /Statuss", () => {

      })
    })   


    // METHOD /StatusReasons
    describe("/StatusReasons", () => {
      describe("GET /StatusReasons", () => {

      })

      describe("POST /StatusReasons", () => {

      })

      describe("PUT /StatusReasons", () => {

      })

      describe("DELETE /StatusReasons", () => {

      })
    })   

    // METHOD /Students
    describe("/Students", () => {
      describe("GET /Students", () => {

      })

      describe("POST /Students", () => {

      })

      describe("PUT /Students", () => {

      })

      describe("DELETE /Students", () => {

      })
    })       


    // METHOD /Students
    describe("/StudentCategories", () => {
      describe("GET /StudentCategories", () => {

      })

      describe("POST /StudentCategories", () => {

      })

      describe("PUT /StudentCategories", () => {

      })

      describe("DELETE /StudentCategories", () => {

      })
    })       

    // METHOD /StudentConsents
    describe("/StudentConsents", () => {
      describe("GET /StudentConsents", () => {

      })

      describe("POST /StudentConsents", () => {

      })

      describe("PUT /StudentConsents", () => {

      })

      describe("DELETE /StudentConsents", () => {

      })
    })       


    // METHOD /StudentConsents
    describe("/StudentContributions", () => {
      describe("GET /StudentContributions", () => {

      })

      describe("POST /StudentContributions", () => {

      })

      describe("PUT /StudentContributions", () => {

      })

      describe("DELETE /StudentContributions", () => {

      })
    })   


    // METHOD /StudentLivingAllowances
    describe("/StudentLivingAllowances", () => {
      describe("GET /StudentLivingAllowances", () => {

      })

      describe("POST /StudentLivingAllowances", () => {

      })

      describe("PUT /StudentLivingAllowances", () => {

      })

      describe("DELETE /StudentLivingAllowances", () => {

      })
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