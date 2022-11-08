const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = 'localhost:8080';
const expect = chai.expect;

//set up a test to make sure that the GitHub API is responding
describe("GitHub commit list", function() {
    //fetch a commit list
    describe("Valid HTTP reponse", 
        function() {
        it("content", function(done) {
        //get commits from the requested URL
            chai.request(app)
            .get('/github_api/commit/octocat/hello-world')
            .end(function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe("Get commit list", 
        function() {
        it("content", function(done) {
        //response should be an object
             chai.request(app)
            .get('/github_api/octocat')
            .end(function (err, res, body) {
                expect(res.body).to.be.an('object');
                done();
            });
        });

    });

});
