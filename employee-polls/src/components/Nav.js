import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, users, dispatch }) => {
  //todo: add active state to navbar, i.e. which tab is currently active
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
    navigate("/login");
    // setLinkClicked(true)
  }
  
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
                  alt={`${users[authedUser].avatarURL}`}
                />                
              </div>
            ) : null}
          </li>
          <li>
            <span className="li-nav-padding" ></span>
          </li>
          <li>
            {authedUser && (
              <Link className="nav-item nav-link" onClick={handleLogout}>
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
