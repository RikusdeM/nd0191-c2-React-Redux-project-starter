import { Link } from "react-router-dom";

const Nav = () => {
    //todo: add active state to navbar, i.e. which tab is currently active
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
    </nav>
  );
};

export default Nav;
