import Question from "./Question";
import "bootstrap/dist/css/bootstrap.css";

const QuestionList = ({ name, questionsIds }) => {
  return (
    <div>
      <h2>{name}</h2>

      <div className="container">
        <div className="row">
          {questionsIds.map((id, index) =>
            index % 4 === 0 && index !== 0 ? (
              <div key={id} className="row">
                <div className="col">
                  <Question id={id}></Question>
                </div>
              </div>
            ) : (
              <div key={id} className="col">
                <Question id={id}></Question>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
