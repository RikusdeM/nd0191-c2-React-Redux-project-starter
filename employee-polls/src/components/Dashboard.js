import { connect } from "react-redux";
import * as lodash from "lodash";
import QuestionList from "./QuestionList";
import "bootstrap/dist/css/bootstrap.css";

const Dashboard = ({
  answeredQuestionsIds,
  unansweredQuestionsIds,
  authedUser,
}) => {
  return (
    <div>
      <h3 className="center">Dashboard of {authedUser}</h3>
      <div className="container">
        <div className="row">
          <div className="col">
            <QuestionList
              name={"New Questions"}
              questionsIds={answeredQuestionsIds}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <QuestionList name={"Done"} questionsIds={unansweredQuestionsIds} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const sortQuestions = (keys) => {
    return keys.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  };

  const answeredQuestionsIds = Object.keys(users[authedUser].answers);
  //   const answeredQuestions = answeredQuestionsIds.map((questionId, index) =>
  //     lodash.get(questions, answeredQuestionsIds[index])
  //   );

  const unansweredQuestionsIds = Object.keys(questions).filter(
    (qId) => !answeredQuestionsIds.includes(qId)
  );
  //   const unansweredQuestions = unansweredQuestionsIds.map((questionId, index) =>
  //     lodash.get(questions, unansweredQuestionsIds[index])
  //   );

  return {
    answeredQuestionsIds: sortQuestions(answeredQuestionsIds),
    unansweredQuestionsIds: sortQuestions(unansweredQuestionsIds),
    authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
