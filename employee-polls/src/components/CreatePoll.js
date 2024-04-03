import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

const CreatePoll = () => {
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");

  const handleChangeOne = (e) => {
    const text = e.target.value
    setTextOne(text)
  }
  const handleChangeTwo = (e) => {
    const text = e.target.value
    setTextTwo(text)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit new Poll")
  };

  return (
    <div>
      <h3>Would You Rather</h3>
      <h5 className="text-muted">Create Your Own Poll</h5>
      <div className="container overflow-hidden">
        <div className="row gy-1">
          <div className="col">
            <div className="p-3">
              <h6>First Option</h6>
              <input placeholder="Option One" onChange={handleChangeOne}/>
            </div>
          </div>
        </div>

        <div className="row gy-1">
          <div className="col">
            <div className="p-3">
              <h6>Second Option</h6>
              <input placeholder="Option Two" onChange={handleChangeTwo} />
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

export default CreatePoll;
