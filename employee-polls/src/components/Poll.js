import "bootstrap/dist/css/bootstrap.css";
import Badge from "react-bootstrap/Badge";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = ({ authedUser, users, question, alreadyAnswered }) => {
  const { id, author, optionOne, optionTwo } = question;
  const { avatarURL } = users[question.author];

  const updatePoll = (e) => {
    e.preventDefault();
    console.log("pressed button");
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
    <div>
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
                        {myAnswer === "optionOne" ? <p>My Answer</p> : ""}
                      </Badge>
                    </h6>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-block btn-outline-success"
                    onClick={(e) => updatePoll(e)}
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
                        {myAnswer === "optionTwo" ? <p>My Answer</p> : ""}
                      </Badge>
                    </h6>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-block btn-outline-success"
                    onClick={(e) => updatePoll(e)}
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
  console.log("alreadyAnswered : " + alreadyAnswered);

  return {
    authedUser,
    users,
    question: question ? question : null,
    alreadyAnswered,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));
