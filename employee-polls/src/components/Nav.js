import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "../utils/helpers";

const Nav = ({ authedUser, users, dispatch, props }) => {
  const navigate = useNavigate();

  const menuItemStates = {
    HOME: { Name: "Home", URL: "/" },
    NEW: { Name: "New", URL: "/add" },
    LEADERBOARD: { Name: "Leaderboard", URL: "/leaderboard" },
    LOGOUT: { Name: "Logout", URL: "/login" },
  };

  const currentLocation = props.router.location.pathname;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
    navigate(menuItemStates.LOGOUT.URL);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
          <Link
            className={
              currentLocation === menuItemStates.HOME.URL
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
            to={menuItemStates.HOME.URL}
          >
            {menuItemStates.HOME.Name}
          </Link>
          <Link
            className={
              currentLocation === menuItemStates.LEADERBOARD.URL
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
            to={menuItemStates.LEADERBOARD.URL}
          >
            {menuItemStates.LEADERBOARD.Name}
          </Link>
          <Link
            className={
              currentLocation === menuItemStates.NEW.URL
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
            to={menuItemStates.NEW.URL}
          >
            {menuItemStates.NEW.Name}
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
            <span className="li-nav-padding"></span>
          </li>
          <li>
            {authedUser && (
              <Link className="nav-item nav-link" onClick={handleLogout}>
                {menuItemStates.LOGOUT.Name}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }, props) => {
  return {
    authedUser,
    users,
    props,
  };
};

export default withRouter(connect(mapStateToProps)(Nav));
