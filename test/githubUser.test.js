const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = 'localhost:8080';
const expect = chai.expect;

//set up a test to make sure that the GitHub API is responding
describe("GitHub user info and repositories", function() {
    //fetch a user
    describe("Valid HTTP reponse", 
        function() {
        it("content", function(done) {
        //get the user from the requested URL
            chai.request(app)
            .get('/github_api/octocat')
            .end(function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe("Get requested user", 
        function() {
        it("content", function(done) {
        //get the user from the requested URL
             chai.request(app)
            .get('/github_api/octocat')
            .end(function (err, res, body) {
                expect(res.text).to.contain("octocat");
                done();
            });
        });

    });

    //fetch the users repositories
    describe("Get users repositories", 
        function() {
        it("content", function(done) {
            //Get the user repositories from the requested URL
                chai.request(app)
            .get('/github_api/octocat/repos/')   
            .end(function (err, res, body) {
              expect(res.body).to.be.an('array');
                done();
            });
        });

    });

});


