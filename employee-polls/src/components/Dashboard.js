import { connect } from "react-redux";
import QuestionList from "./QuestionList";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

const Dashboard = ({
  answeredQuestionsIds,
  unansweredQuestionsIds,
  authedUser,
}) => {
  const QUESTIONS = {
    UNANSWERED: 0,
    ANSWERED: 1,
    ALL: 2,
  };

  const [dropDown, setDropDown] = useState(QUESTIONS.UNANSWERED);  

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Show Polls">
        <Dropdown.Item          
          disabled={dropDown === QUESTIONS.UNANSWERED}
          onClick={(e) => setDropDown(QUESTIONS.UNANSWERED)}
        >
          New Questions
        </Dropdown.Item>
        <Dropdown.Item disabled={dropDown === QUESTIONS.ANSWERED} onClick={(e) => setDropDown(QUESTIONS.ANSWERED)}>
          Done
        </Dropdown.Item>
        <Dropdown.Item disabled={dropDown === QUESTIONS.ALL} onClick={(e) => setDropDown(QUESTIONS.ALL)}>
          All
        </Dropdown.Item>
      </DropdownButton>

      {dropDown === QUESTIONS.UNANSWERED ? (
        <div className="container content-center">
          <QuestionList
            name={"New Questions"}
            questionsIds={unansweredQuestionsIds}
          />
        </div>
      ) : null}

      {dropDown === QUESTIONS.ANSWERED ? (
        <div className="container content-center">
          <QuestionList name={"Done"} questionsIds={answeredQuestionsIds} />
        </div>
      ) : null}

      {dropDown === QUESTIONS.ALL ? (
        <div className="container content-center">
          <div className="row dashboard-padding">
            <div className="col">
              <QuestionList
                name={"New Questions"}
                questionsIds={unansweredQuestionsIds}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <QuestionList name={"Done"} questionsIds={answeredQuestionsIds} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  const sortQuestions = (keys) => {
    return keys.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  };

  const answeredQuestionsIds = Object.keys(users[authedUser].answers);

  const unansweredQuestionsIds = Object.keys(questions).filter(
    (qId) => !answeredQuestionsIds.includes(qId)
  );

  return {
    answeredQuestionsIds: sortQuestions(answeredQuestionsIds),
    unansweredQuestionsIds: sortQuestions(unansweredQuestionsIds),
    authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
