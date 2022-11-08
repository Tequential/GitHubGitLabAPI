const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = 'localhost:8080';
const expect = chai.expect;

//set up a test to make sure that the GitHub API is responding
describe("GitLab user info and repositories", function() {
    //fetch a user
    describe("Valid HTTP reponse", 
        function() {
        it("content", function(done) {
        //get the user from the requested URL
            chai.request(app)
            .get('/gitlab_api/users/jack_smith')
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
            .get('/gitlab_api/users/jack_smith')
            .end(function (err, res, body) {
                expect(res.text).to.contain("jack_smith");
                done();
            });
        });

    });

    //fetch the users projects
    describe("Get users projects", 
        function() {
        it("content", function(done) {
            //Get the user repositories from the requested URL
                chai.request(app)
            .get('/gitlab_api/projects/jack_smith')   
            .end(function (err, res, body) {
              expect(res.body).to.be.an('array');
                done();
            });
        });

    });

});


