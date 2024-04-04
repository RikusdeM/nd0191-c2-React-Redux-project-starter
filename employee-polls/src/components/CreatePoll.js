import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const CreatePoll = ({ authedUser, dispatch }) => {
  const navigate = useNavigate();
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");

  const handleChangeOne = (e) => {
    const text = e.target.value;
    setTextOne(text);
  };
  const handleChangeTwo = (e) => {
    const text = e.target.value;
    setTextTwo(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      author: authedUser,
      optionOneText: textOne,
      optionTwoText: textTwo,
    };

    dispatch(handleAddQuestion(newQuestion));

    setTextOne("");
    setTextTwo("");

    navigate("/");
  };

  return (
    <div className="content-center">
      <h3>Would You Rather</h3>
      <h5 className="text-muted">Create Your Own Poll</h5>
      <div className="container overflow-hidden">
        <div className="row gy-1">
          <div className="col">
            <div className="p-3">
              <h6>First Option</h6>
              <input
                placeholder="Option One"
                value={textOne}
                onChange={handleChangeOne}
              />
            </div>
          </div>
        </div>

        <div className="row gy-1">
          <div className="col">
            <div className="p-3">
              <h6>Second Option</h6>
              <input
                placeholder="Option Two"
                value={textTwo}
                onChange={handleChangeTwo}
              />
            </div>
          </div>
        </div>

        <div className="row gy-1">
          <div className="col">
            <div className="p-1">
              <button
                type="button"
                disabled={textOne === "" || textTwo === ""}
                className="btn btn-sm btn-block btn-outline-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(CreatePoll);
