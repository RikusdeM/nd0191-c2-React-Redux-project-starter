import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const Question = ({ authedUser, question }) => {
  const navigate = useNavigate();
  const { id, author, timestamp } = question;

  const toPoll = (e, id) => {
    e.preventDefault();    
    navigate(`/questions/${id}`);
  };

  if (question === null) {
    return <p>This Question doesn't exist</p>;
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
          onClick={(e) => toPoll(e, question.id)}
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
