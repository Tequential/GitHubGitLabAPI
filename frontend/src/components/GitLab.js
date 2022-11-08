import React from "react"
import { useState, useEffect, useRef } from "react";
import { getAPIdata } from './api';

//GitLab component to render a users GitLab projects and commit details
function GitLab({ user, setError, api}) {

    //set state variables
    const [commitLoading, setCommitLoading] = useState(false);
    const [commitList, setCommitList] = useState([]);
    const [project, setProject] = useState("");
    const [gitLabProjects, setGitLabProjects] = useState([]);
    const [projectLoading, setProjectLoading] = useState(false);
    const [projectDate, setProjectDate] = useState('');

    //fetch the GitLab project list from the GitLab API
    const fetchDetailsProject = async () => {
        try {
         const resGLProjects = await  getAPIdata(`/gitlab_api/projects/${user}`);
          setGitLabProjects(resGLProjects);
        } catch (error) {
          setError("GitLab Projects error");
        } finally {
          setProjectLoading(false);
        }
      };

    //fetch the commit list from the GitLab API
    const fetchDetailsGLCommits = async () => {
        try {
          const resGLCommits = await  getAPIdata(`/gitlab_api/commits/${project}`);
          setCommitList(resGLCommits);
        } catch (error) {
          setError("GitLab Commit Error");
        } finally {
          setCommitLoading(false);
        }
      };

    //only run this once  
    useEffect(() => {
      setError(false)
      setProjectLoading(true);
      fetchDetailsProject();
    }, []);

    //function to update the commit list
      function updateCommits(){
        setCommitLoading(true);
        setError(false);
        setCommitList([]);
        fetchDetailsGLCommits();
    }

    //don't update the commit list on initial rende
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    //update commit list when the project state changes
    useDidMountEffect(() => {
        updateCommits();
    }, [project]);  



//redner the results based on each state
    if (api === "GitLab") {
        return (
            <div>
                <div className="row mt-4">
                    <div className="col-6">
                        {projectLoading && <div>...Loading Data from GitLab projects...</div>}
                        {!projectLoading && gitLabProjects && <h3>{Object.keys(gitLabProjects).length} GitLab Project/s for {user}</h3>}                       
                            {!projectLoading && gitLabProjects &&
                                gitLabProjects.map(( project, index ) => (
                                    <div className="row">
                                        <div className="col-2">
                                            <button className="btn btn-info " value={project.name} onClick={(e) => {setProject(project.id); setProjectDate(project.created_at)}}>Details</button>
                                        </div>
                                        <div className="col-10">
                                            <div key={index}>{project.name}</div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                    <div className="col-6">
                        {commitLoading ? <div>...Loading Data from GitLab Commits...</div> :
                            <div>
                                {project && 
                                    <div><h4>Date Created:</h4> {projectDate}</div>}
                                    <br></br>
                                    {commitList.length > 0 && 
                                        <div><h4>Last Commit Date:</h4>
                                            <div>{commitList[0].committed_date}</div>
                                            <br></br>
                                            <h4>Last 5 GitLab Commits {project}</h4>
                                        </div>
                                    }  
                                    <ul>         
                                    {commitList &&                
                                        commitList.map(( commit, index ) => {
                                            if (index <5) {
                                                return (<li key={index}>{commit.title}</li>)
                                            }
                                        })
                                    } 
                                </ul>   
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
   
        
    


export default GitLab;
