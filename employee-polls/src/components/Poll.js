import "bootstrap/dist/css/bootstrap.css";
import Badge from "react-bootstrap/Badge";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = ({ authedUser, users, question, alreadyAnswered, dispatch }) => {
  const { id, author, optionOne, optionTwo } = question;
  const { avatarURL } = users[question.author];

  const ANSWERS = {
    OPTION_ONE: "optionOne",
    OPTION_TWO: "optionTwo",
  };

  const updatePoll = (e, answer) => {
    e.preventDefault();
    dispatch(handleAnswerQuestion({ authedUser, id, answer }));
  };

  const pollSummary = {
    totalUsers: Object.keys(users).length,
    optOneVotes: question.optionOne.votes.length,
    optTwoVotes: question.optionTwo.votes.length,
  };

  const myAnswerFun = () => {
    const authedUserInfo = users[authedUser];
    if (alreadyAnswered && authedUserInfo) {
      return authedUserInfo.answers[id];
    } else {
      return null;
    }
  };

  const myAnswer = myAnswerFun();

  return (
    <div className="content-center">
      <h2>Poll by {author}</h2>
      <img
        src={`../${avatarURL}`}
        alt={`Avatar of ${author}`}
        className="avatar"
      />
      <h3>Would you Rather</h3>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{optionOne.text}</h5>
                {alreadyAnswered ? (
                  <div>
                    <h6>
                      {pollSummary.optOneVotes} Votes{" "}
                      <Badge bg="secondary">
                        {(pollSummary.optOneVotes / pollSummary.totalUsers) *
                          100}
                        %
                      </Badge>
                    </h6>
                    <h6>
                      <Badge bg="info">
                        {myAnswer === ANSWERS.OPTION_ONE ? (
                          <p>My Answer</p>
                        ) : (
                          ""
                        )}
                      </Badge>
                    </h6>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-block btn-outline-success"
                    onClick={(e) => updatePoll(e, ANSWERS.OPTION_ONE)}
                  >
                    Click
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{optionTwo.text}</h5>
                {alreadyAnswered ? (
                  <div>
                    <h6>
                      {pollSummary.optTwoVotes} Votes{" "}
                      <Badge bg="secondary">
                        {(pollSummary.optTwoVotes / pollSummary.totalUsers) *
                          100}
                        %
                      </Badge>
                    </h6>
                    <h6>
                      <Badge bg="info">
                        {myAnswer === ANSWERS.OPTION_TWO ? (
                          <p>My Answer</p>
                        ) : (
                          ""
                        )}
                      </Badge>
                    </h6>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-block btn-outline-success"
                    onClick={(e) => updatePoll(e, ANSWERS.OPTION_TWO)}
                  >
                    Click
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { question_id } = props.router.params;
  const question = questions[question_id];
  const user = users[question.author];

  const alreadyAnswered = Object.keys(users[authedUser].answers).includes(
    question_id
  );

  return {
    authedUser,
    users,
    question: question ? question : null,
    alreadyAnswered,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));
