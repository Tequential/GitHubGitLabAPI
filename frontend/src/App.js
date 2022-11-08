import './App.css';
import { useState } from "react";
import { Header } from './components/Header'
import Search from './components/Search';
import Results  from './components/Results';
import GitHub from './components/GitHub';
import GitLab from './components/GitLab';

//main component
function App() {

  //set state variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchUser, setSearchUser] = useState(false);
  const [user, setUser] = useState(false);
  const [api, setAPI] = useState([]);

  //render the components. Based on the state set in the components, either the GitHub or GitLab component will display
  return (
        <div className="App-container">
          <div className="cars-container">
            <Header loading={loading} error={error}/>
            <Search searchUser={searchUser} setSearchUser={setSearchUser} setUser={setUser}/>
            {user && 
              <Results setError={setError} setAPI={setAPI} user={user} setLoading={setLoading}/>
            }
            {api ==="GitHub" && 
              <GitHub user={user} error={error} setError={setError} api={api}/>
            }
            {api ==="GitLab" && 
              <GitLab user={user} error={error} setError={setError} api={api}/>
            }
          </div>
        </div>
  )
}

export default App;
