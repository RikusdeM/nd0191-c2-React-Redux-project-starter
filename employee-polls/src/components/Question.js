import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const Question = ({ authedUser, question }) => {
  const { id, author, timestamp } = question;
  console.log("from the question");
  console.log(question);
  console.log(author);

  return (
    <div>
      <ol>
        <li key={author}>{author}</li>
        <li key={timestamp}>{formatDate(timestamp)}</li>
        <li key={id}>{id}</li>        
      </ol>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(Question);
