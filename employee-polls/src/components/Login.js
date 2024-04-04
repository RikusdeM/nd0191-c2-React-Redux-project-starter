import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginImage = "avatar_beard_hipster_male_man.png";

  const onUserInputChange = (event) => {
    const userNameValue = event.target.value;
    setUserName(userNameValue);
  };

  const onPasswordInputChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  const login = (e) => {
    e.preventDefault();

    const user = users[userName];
    
    if (user !== undefined) {
      if (user.password === password) {                
        dispatch(setAuthedUser(user.id));

        setUserName("");
        setPassword("");

        navigate(`/`);
      } else {
        alert(
          "Incorrect password, please try again"
        );
      }
    } else {
      alert("This user does not exist");
    }
  };
  
  return (
    <div className="content-center">
      <h1>Employee Polls</h1>
      <div className="content-center">
        <img
          alt={`${loginImage}`}
          src={`../${loginImage}`}
          style={{ width: 128, height: 128 }}
        />
      </div>
      <h2>Login</h2>
      <h6>User</h6>
      <input
        type="text"
        placeholder="User"
        value={userName}
        onChange={onUserInputChange}
      />
      <h6>Password</h6>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordInputChange}
        className="login-btn-padding"
      />
      <div>
        <button
          type="button"
          className="btn btn-sm btn-block btn-outline-success"
          onClick={login}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Login);
