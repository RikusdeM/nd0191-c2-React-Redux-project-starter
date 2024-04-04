import "../App.css";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import CreatePoll from "./CreatePoll";
import Leaderboard from "./Leaderbord";
import Nav from "./Nav";
import NoMatch from "./NoMatch";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <div className="container">
        {props.loggedIn === false ? null : <Nav />}

        <Routes>
          <Route path="/login" exact element={<Login />} />

          <Route
            exact
            path="/"
            element={
              props.loggedIn ? (
                <Dashboard />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />

          <Route
            exact
            path="/questions/:question_id"
            element={
              props.loggedIn ? <Poll /> : <Navigate replace to={"/login"} />
            }
          />

          <Route
            exact
            path="/leaderboard"
            element={
              props.loggedIn ? (
                <Leaderboard />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />

          <Route
            exact
            path="/add"
            element={
              props.loggedIn ? (
                <CreatePoll />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: authedUser !== null,
});

export default connect(mapStateToProps)(App);
