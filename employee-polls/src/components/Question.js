import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const Question = ({ authedUser, question }) => {
  const { id, author, timestamp } = question;
  console.log("from the question");
  console.log(question);
  console.log(author);


  const toPoll = (e, id) => {
    e.preventDefault();
    console.log("Show the completed or currently running poll")

    // TODO: Redirect to parent Tweet
  };

  if (question === null) {
    return <p>This Tweet doesn't existd</p>;
  }

  return (
    <div className="card" style={{ width: "15rem" }}>
      <div className="card-body">
        <h5 className="card-title">{author}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {formatDate(timestamp)}
        </h6>
        <p className="card-text">{id}</p>
        <button
          type="button"
          className="btn btn-sm btn-block btn-primary"
          onClick={(e) => toPoll(e)}
        >
          Show
        </button>
        {/* <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a> */}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(Question);
