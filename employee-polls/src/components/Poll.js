import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

const Poll = ({ authedUser, user, question }) => {
  const { id, author, optionOne, optionTwo } = question;
  const { avatarURL } = user;

  const updatePoll = (e) => {
    e.preventDefault();
    console.log("pressed button");
  };


  return (
    <div>
      <h2>Poll by {author}</h2>
      <img src={avatarURL} alt={`Avatar of ${author}`} className="avatar" />
      <h3>Would you Rather</h3>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{optionOne.text}</h5>
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-outline-success"
                  onClick={(e) => updatePoll(e)}
                >
                  Click
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{optionTwo.text}</h5>
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-outline-success"
                  onClick={(e) => updatePoll(e)}
                >
                  Click
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const user = users[question.author];

  return {
    authedUser,
    user,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(Poll);
