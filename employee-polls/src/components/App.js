import "../App.css";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import CreatePoll from "./CreatePoll";
import Leaderboard from "./Leaderbord";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <div className="container">
        <Nav/>
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard/>} />
            {/* <Poll id={questionID} /> */}
            {/* <Route path="/questions/:question_id" element={<Page />} /> */}
            <Route path="/questions/:question_id" element={<Poll />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/add" exact element={<CreatePoll />} />

          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
