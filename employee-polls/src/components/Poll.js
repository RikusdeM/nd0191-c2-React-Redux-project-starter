import "bootstrap/dist/css/bootstrap.css";

import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import PollCard, { ANSWERS } from "./PollCard";

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
          <PollCard
            optionText={optionOne.text}
            alreadyAnswered={alreadyAnswered}
            optVotes={pollSummary.optOneVotes}
            totalUsers={pollSummary.totalUsers}
            myAnswer={myAnswer}
            pollAnswer={ANSWERS.OPTION_ONE}
            updatePoll={updatePoll}
            dataTestid={"option-one"}
          />
          <PollCard
            optionText={optionTwo.text}
            alreadyAnswered={alreadyAnswered}
            optVotes={pollSummary.optTwoVotes}
            totalUsers={pollSummary.totalUsers}
            myAnswer={myAnswer}
            pollAnswer={ANSWERS.OPTION_TWO}
            updatePoll={updatePoll}
            dataTestid={"option-two"}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const getQuestionIdFromRouter = (props) => {
    const routerParams = props.router.params;
    if (Object.keys(routerParams).length > 0) {
      return routerParams.question_id;
    } else {
      const url = props.router.location.pathname;
      const parts = url.split("/");
      const questionId = parts[parts.length - 1];
      return questionId;
    }
  };

  const question_id = getQuestionIdFromRouter(props);
  const question = questions[question_id];
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
