import "../App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Poll from "./Poll";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  const questionID = "loxhs1bqm25b708cmbf3g"

  return (
    <div className="App">{props.loading === true ? null : <Poll id={questionID} />}</div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
