//Header to display loading and/or errors
export function Header({ loading, error }) {
    return (
      <div className="App-header" >
          Github/GitLab Users
          {loading && <div>A moment please...</div>}
          {error && (
            <div className="error">{`There is a problem fetching data from the API - ${error}`}</div>
          )}
      </div>
    );
  }

  export default Header;