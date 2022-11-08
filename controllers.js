const https = require('https');
const request = require("request"); 

//GET user from the GitHub API
const getUser= async function (req, res) {
    const user = req.params.user;
    const urlGithub = `https://api.github.com/users/${user}`;
    const requestOptions = {
        url: urlGithub,
        method: "GET",
        json: {},
        qs: {
            offset: 20,
        },
        headers: { "user-agent": "node.js" },
        error_message:"GitLab request failed"
    };
    request(requestOptions, (err, response, body) => {
        if (err) {
        res.send("error");
        } else {
        res.send(body);
        }
});
}

//GET repo from the GitHub API
const getRepo= async function (req, res) {
  const user = req.params.user;
  const urlGithubRepo = `https://api.github.com/users/${user}/repos`;
  const requestOptions = {
    url: urlGithubRepo,
    method: "GET",
    json: {},
    qs: {
      offset: 20,
    },
    headers: { "user-agent": "node.js" },
    error_message:"GitHub repos request failed"
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      res.send("error");
    } else {
      res.send(body);
    }
});
}

//GET user from the GitLab API
const getUserGitLab= async function (req, res) {
  const user = req.params.user;
  const urlGitlab = `https://gitlab.com/api/v4/users?username=${user}`;
  const requestOptions = {
    url: urlGitlab,
    method: "GET",
    json: {},
    qs: {
    offset: 20,
    },
    headers: { "user-agent": "node.js" },
    error_message:"GitLab request failed"
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      res.send("error");
    } else {
      res.send(body);
    }
});
}

//GET commits from the GitHub API
const getCommit= async function (req, res) {
  const user = req.params.user;
  const reponame = req.params.reponame;
  const urlGithubRepo = `https://api.github.com/repos/${user}/${reponame}/commits`;
  const requestOptions = {
    url: urlGithubRepo,
    method: "GET",
    json: {},
    qs: {
      offset: 20,
    },
    headers: { "user-agent": "node.js" },
    error_message:"GitHub repos request failed"
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      res.send("error");
    } else {
      res.send(body);
    }
});
}

//GET projects from the GitLab API
const getProjectsGitLab= async function (req, res) {
  const user = req.params.user;
  const urlGitLabRepo = `https://gitlab.com/api/v4/users/${user}/projects`;
  const requestOptions = {
    url: urlGitLabRepo,
    method: "GET",
    json: {},
    qs: {
      offset: 20,
    },
    headers: { "user-agent": "node.js" },
    error_message:"GitLab projects request failed"
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      res.send("error");
    } else {
      res.send(body);
    }
});
}

//GET commits from the GitLab API
const getCommitGitLab= async function (req, res) {
  const id = req.params.id;
  const urlGitLabCommits = `https://gitlab.com/api/v4/projects/${id}/repository/commits`;
  const requestOptions = {
    url: urlGitLabCommits,
    method: "GET",
    json: {},
    qs: {
      offset: 20,
    },
    headers: { "user-agent": "node.js" },
    error_message:"GitHub repos request failed"
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      res.send("error");
    } else {
      res.send(body);
    }
});
}

module.exports = { getUser, getRepo, getCommit, getUserGitLab, getProjectsGitLab, getCommitGitLab }