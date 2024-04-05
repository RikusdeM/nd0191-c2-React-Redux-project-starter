import Question from "./Question";
import "bootstrap/dist/css/bootstrap.css";
import DynamicGrid from "../utils/DynamicGrid";

const QuestionList = ({ name, questionsIds }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div className="container">
        <DynamicGrid colCount={3} md={3}>
          {questionsIds.length > 0
            ? questionsIds.map((id, index) => (
                <div key={index}>
                  <Question id={id}></Question>                  
                </div>
              ))
            : [<p key={"noQuestions"}>No Questions are found.</p>]}
        </DynamicGrid>   
      </div>
    </div>
  );
};

export default QuestionList;
