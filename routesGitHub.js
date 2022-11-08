const express = require('express');
const controllers=require('./controllers');
const router = express.Router();

//GitHub API routes
router.get('/:user', controllers.getUser)

router.get('/:user/repos/', controllers.getRepo)

router.get('/commit/:user/:reponame', controllers.getCommit)

module.exports = router;
