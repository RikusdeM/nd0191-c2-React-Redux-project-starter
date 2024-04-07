import "bootstrap/dist/css/bootstrap.css";

import { connect } from "react-redux";
import { splitQuestionFromURL, withRouter } from "../utils/helpers";
import { handleAnswerQuestion } from "../actions/questions";
import PollCard, { ANSWERS } from "./PollCard";

const Poll = ({ authedUser, users, question, alreadyAnswered, dispatch }) => {
  const { avatarURL } = users[question.author];

  const updatePoll = (e, answer) => {
    e.preventDefault();
    dispatch(
      handleAnswerQuestion({
        authedUser,
        id: question.id,
        answer,
      })
    );
  };

  const pollSummary = {
    totalUsers: Object.keys(users).length,
    optOneVotes: question.optionOne.votes.length,
    optTwoVotes: question.optionTwo.votes.length,
  };

  const myAnswerFun = () => {
    const authedUserInfo = users[authedUser];
    if (alreadyAnswered && authedUserInfo) {
      return authedUserInfo.answers[question.id];
    } else {
      return null;
    }
  };

  const myAnswer = myAnswerFun();

  return question === null ? (
    <p>No such Poll</p>
  ) : (
    <div className="content-center">
      <h2>Poll by {question.author}</h2>
      <img
        src={`../${avatarURL}`}
        alt={`Avatar of ${question.author}`}
        className="avatar"
      />
      <h3>Would you Rather</h3>
      <div className="container">
        <div className="row">
          <PollCard
            optionText={question.optionOne.text}
            alreadyAnswered={alreadyAnswered}
            optVotes={pollSummary.optOneVotes}
            totalUsers={pollSummary.totalUsers}
            myAnswer={myAnswer}
            pollAnswer={ANSWERS.OPTION_ONE}
            updatePoll={updatePoll}
            dataTestid={"option-one"}
          />
          <PollCard
            optionText={question.optionTwo.text}
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
      const questionId = splitQuestionFromURL(url);
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
