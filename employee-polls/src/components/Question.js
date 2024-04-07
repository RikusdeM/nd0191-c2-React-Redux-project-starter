import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const Question = ({ question }) => {
  const navigate = useNavigate();

  const toPoll = (e, id) => {
    e.preventDefault();
    navigate(`/questions/${id}`);
  };

  return question === null ? (
    <p>This Question doesn't exist</p>
  ) : (
    <div className="card" style={{ width: "15rem" }}>
      <div className="card-body">
        <h5 className="card-title">{question.author}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {formatDate(question.timestamp)}
        </h6>
        {/* <p className="card-text">{id}</p> */}
        <button
          type="button"
          className="btn btn-sm btn-block btn-primary"
          onClick={(e) => toPoll(e, question.id)}
        >
          Show
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(Question);
