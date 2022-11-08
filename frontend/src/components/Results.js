import '../App.css';
import { useState, useEffect } from "react";
import { getAPIdata } from './api';

const Results = ({user, setError, setAPI, setLoading, error}) => {

  //use state variables
  const [GHloading, setGHLoading] = useState(true);
  const [GLloading, setGLLoading] = useState(true);
  const [gitHubData, setGitHubData] = useState([]);
  const [gitLabData, setGitLabData] = useState([]);
 
  //function to fetch user data from the GitHubAPI
  const fetchDetailsGHU = async () => {
    try {
      const resGHUser = await getAPIdata(`/github_api/${user}`);
      setGitHubData(resGHUser);
    } catch (error) {
      setError("No GitHub User");
    } finally {
      setGHLoading(false);
    }
  };

  //function to fetch basic user data from the GitLabAPI
  const fetchDetailsGLU = async () => {
    try {
      const resGLUser = await getAPIdata(`/gitlab_api/users/${user}`)
      setGitLabData(resGLUser);
      console.log(JSON.stringify(gitLabData))
    } catch (error) {
      setError("No GitLab User");
    } finally {
      setGLLoading(false);
    }
  };

  //fetch data from the API every time a new user is entered
    useEffect(() => {
        setError(false);
        setGHLoading(true);
        setGLLoading(true);
        setAPI("");  
        fetchDetailsGHU();
        fetchDetailsGLU();
        setLoading(false);
    }, [user]);

    //render the results from the API based on state
  return (
    <div>
        <div className="row mt-4">
            {GHloading && <div>...Loading Data from Github</div>}
            {!GHloading &&  (
                <div className="col-6">
                    <h2> GitHub Info</h2>
                        {gitHubData.message == "Not Found" ? 
                            <div className="col-6">User Not Found</div> :
                            <>
                                <img className="img-profile" src={gitHubData.avatar_url}></img>
                                <div>Name: {gitHubData.name}</div> 
                                <div>Create Date: {gitHubData.created_at}</div> 
                                <div className="external_link">
                                    GitHub Profile: <a href={gitHubData.html_url}>{gitHubData.html_url}</a>
                                </div>
                                <div>Bio: {gitHubData.bio}</div>
                                <br></br>
                                <button className="btn btn-info" onClick={() => setAPI("GitHub")}>GitHub Details</button>
                            </>
                        } 
                </div>
            )}
            {GLloading && <div>...Loading Data from GitLab</div>}
            {!GLloading && (
                <div className="col-6">
                    <h2>GitLab Info</h2>
                    {Object.keys(gitLabData).length == 0 ? <div className="col-6">User Not Found</div> :
                    <>
                        <img src={gitLabData[0].avatar_url}></img>
                        <div>Name: {gitLabData[0].name}</div> 
                        <div>State: {gitLabData[0].state}</div> 
                        <div className="external_link" >GitLab Profile: <a href={gitLabData[0].web_url}> {gitLabData[0].web_url}</a></div>
                        <br></br>
                        <br></br>
                        <button className="btn btn-info" onClick={() => setAPI("GitLab")}>GitLab Details</button>
                    </>
                    }
                </div>
            )}
        </div>
    </div>
  )
}

export default Results;
