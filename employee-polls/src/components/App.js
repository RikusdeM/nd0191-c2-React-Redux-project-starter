import "../App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import CreatePoll from "./CreatePoll";
import Leaderboard from "./Leaderbord";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  const questionID = "loxhs1bqm25b708cmbf3g"

  return (
    <div className="App">{props.loading === true ? null : <Leaderboard />}</div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
