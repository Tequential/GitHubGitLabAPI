import React from "react"

//search box and button. Update the state when these change
function Search({ setUser, setSearchUser, searchUser }) {
    return (<div className="row justify-content-center mt-4">
              Search for a user in GitHub or GitLab:
              <div className="col-3">
                <input className="form-control" placeholder="Username" onChange={(e) => setSearchUser(e.target.value)} type="text"/>
              </div>
              <div className="col-1">
                <button className="btn btn-info" onClick={(e) => setUser(searchUser)}>Search</button>
              </div>
            </div>
    )
}

export default Search;