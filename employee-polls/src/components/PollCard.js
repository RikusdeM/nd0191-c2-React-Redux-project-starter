import Badge from "react-bootstrap/Badge";

export const ANSWERS = {
  OPTION_ONE: "optionOne",
  OPTION_TWO: "optionTwo",
};

// data-testid="option-two-badge-b"
const PollCard = ({
  optionText,
  alreadyAnswered,
  optVotes,
  totalUsers,
  myAnswer,
  pollAnswer,
  updatePoll,
  dataTestid,
}) => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{optionText}</h5>
          {alreadyAnswered ? (
            <div>
              <h6>
                {optVotes} Votes{" "}
                <Badge bg="secondary" data-testid={`${dataTestid}-badge-a`}>
                  {(optVotes / totalUsers) * 100}%
                </Badge>
              </h6>
              <h6>
                <Badge bg="info" data-testid={`${dataTestid}-badge-b`}>
                  {myAnswer === pollAnswer ? <p>My Answer</p> : ""}
                </Badge>
              </h6>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-block btn-outline-success"
              onClick={(e) => updatePoll(e, pollAnswer)}
              data-testid={`vote-${dataTestid}`}
            >
              Click
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PollCard;
