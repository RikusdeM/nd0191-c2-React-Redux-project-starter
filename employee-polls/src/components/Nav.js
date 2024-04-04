import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = ({ authedUser, users }) => {
  //todo: add active state to navbar, i.e. which tab is currently active
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link active">
            Home
            {/* <span className="sr-only">(current)</span> */}
          </Link>
          <Link to="/leaderboard" className="nav-item nav-link">
            Leaderboard
          </Link>
          <Link to="/add" className="nav-item nav-link">
            New
          </Link>
        </div>
      </div>
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="li-nav-center">
            {users[authedUser] ? (        
              <div>
                <span>{authedUser}</span>
                <img
                  src={`../${users[authedUser].avatarURL}`}
                  style={{ width: 34, height: 34 }}
                />                
              </div>
            ) : null}
          </li>
          <li>
            <span className="li-nav-padding" ></span>
          </li>
          <li>
            {authedUser && (
              <Link to="/logout" className="nav-item nav-link">
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(Nav);
