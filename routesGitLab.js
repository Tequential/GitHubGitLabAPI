const express = require('express');
const controllers=require('./controllers');
const router = express.Router();

//GitLab API routes
router.get('/users/:user', controllers.getUserGitLab), 
router.get('/projects/:user', controllers.getProjectsGitLab), 
router.get('/commits/:id', controllers.getCommitGitLab), 

module.exports = router;