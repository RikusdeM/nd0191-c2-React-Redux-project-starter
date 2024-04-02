import Question from "./Question";

const QuestionList = ({ name, questionsIds }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>
        <ol>
          {questionsIds.map((id, index) => (
            <li key={index}>
              <Question id={id}></Question>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default QuestionList;
