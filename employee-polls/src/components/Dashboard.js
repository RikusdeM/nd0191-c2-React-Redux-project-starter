import { connect } from "react-redux";
import * as lodash from "lodash";
import QuestionList from "./QuestionList";

const Dashboard = ({ answeredQuestionsIds, unansweredQuestionsIds, authedUser }) => {
  return (
    <div>
      <h3 className="center">Dashboard of {authedUser}</h3>
      <ul className="dashboard-list">
        <QuestionList
          name={"New Questions"}
          questionsIds={answeredQuestionsIds}
        />
        <QuestionList name={"Done"} questionsIds={unansweredQuestionsIds} />
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const sortQuestions = (keys) => {
    return keys.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  };

  const answeredQuestionsIds = Object.keys(users[authedUser].answers);
  const answeredQuestions = answeredQuestionsIds.map((questionId, index) =>
    lodash.get(questions, answeredQuestionsIds[index])
  );

  const unansweredQuestionsIds = Object.keys(questions).filter(
    (qId) => !answeredQuestionsIds.includes(qId)
  );
  const unansweredQuestions = unansweredQuestionsIds.map((questionId, index) =>
    lodash.get(questions, unansweredQuestionsIds[index])
  );

  //   console.log("unsIds")
  //   console.log(unansweredQuestionsIds)
  //   console.log(sortQuestions(unansweredQuestionsIds));

  //   console.log("ans")
  //   console.log(answeredQuestions);

  //   console.log("UNans")
  //   console.log(unansweredQuestions);

  return {
    answeredQuestionsIds: sortQuestions(answeredQuestionsIds),
    unansweredQuestionsIds: sortQuestions(unansweredQuestionsIds),
    authedUser
  };
};

export default connect(mapStateToProps)(Dashboard);
