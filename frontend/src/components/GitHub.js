import React from "react"
import { useState, useEffect, useRef } from "react";
import { getAPIdata } from './api';

//GitHub component to render a users GitHub repos and commit details
function GitHub({ user, setError, api}) {

    //set state variables
    const [commitLoading, setCommitLoading] = useState(false);
    const [commitList, setCommitList] = useState([]);
    const [repo, setRepo] = useState("");
    const [gitHubRepos, setGitHubRepos] = useState([]);
    const [repoLoading, setRepoLoading] = useState(true);
    const [commitDate, setCommitDate] = useState("");
    const [createDate, setCreateDate] = useState("");

    //update the GitHub commit list
    function updateCommits()  {
        setCommitLoading(true);
        setError(false);
        setCommitList([]);
        fetchDetailsGHCommits();
      }

    //fetch repo details from the API
    const fetchDetailsRepo = async () => {
        try {
         const resGHRepos = await  getAPIdata(`/github_api/${user}/repos`);
         setGitHubRepos(resGHRepos);
        } catch (error) {
          setError("Repo not found :(");
        } finally {
          setRepoLoading(false);
        }
      };

    //fetch commit details from the API  
    const fetchDetailsGHCommits = async () => {
        try {
          const resGHCommits = await  getAPIdata(`/github_api/commit/${user}/${repo}`);
          setCommitList(resGHCommits);
        } catch (error) {
          setError("No commit history");
        } finally {
          setCommitLoading(false);
        }
      };

    //only run this once
    useEffect(() => {
        setError(false)
        setRepoLoading(true);
        fetchDetailsRepo();
      }, []);

    
    //don't update the commit list on initial render
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
            useEffect(() => {
                if (didMount.current) func();
                else didMount.current = true;
        }, deps);
    }

    //update commit list when the repo state changes
    useDidMountEffect(() => {
        updateCommits();
    }, [repo]);    

    //render the results based on each state
    if (api === "GitHub") {
        return (
            <div>
                <div className="row mt-4">
                    <div className="col-6">
                        {repoLoading && <div>...Loading Data from GitHub Repos...</div>}
                        {!repoLoading && gitHubRepos && <h3>Repositories for {user}:</h3>}    
                        {!repoLoading && gitHubRepos &&
                            gitHubRepos.map(( repo, index ) => (
                                <div className="row">
                                    <div className="col-2">
                                        <button className="btn btn-info ml-auto" value={repo.name} onClick={(e) => {
                                            setRepo(repo.name); setCommitDate(repo.pushed_at); setCreateDate(repo.created_at)
                                            }}>
                                                Details
                                        </button>
                                    </div>
                                    <div className="col-10">
                                        <div key={index}>{repo.name}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-6">
                        {commitLoading ? 
                            <div>...Loading Data from GitHub Commits...</div> :
                            <div>
                                {repo && 
                                    <div><h4>Date Created:</h4> {commitDate}</div>}
                                    <br></br>
                                    {commitList.length > 0 && 
                                        <div><h4>Last Commit Date:</h4>
                                            <div>{createDate}</div>
                                            <br></br>
                                            <h4>Last 5 GitHub Commits for {repo}</h4>
                                        </div>
                                    }  
                                    <ul>         
                                    {commitList &&                
                                        commitList.map(( commit, index ) => {
                                            if (index <5) {
                                                return (<li key={index}>{commit.commit.message}</li>)
                                            }
                                        })
                                    } 
                                </ul>   
                            </div>
                        }
                    </div>
                </div>
            </div>)
    }
}
export default GitHub;
