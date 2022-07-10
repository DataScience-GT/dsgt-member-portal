import React, { useState } from "react";
import "./Login.css";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<Partial<LoginData>>({});

  //update state with email
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      email: e.target.value,
    });
  };

  //update state with password
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  };

  //attempt to login with the given details
  const attemptLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    //prevent default form actions (page reload and go to action)
    e.preventDefault();

    console.log(loginData);
  };

  return (
    <div id="login-page">
      <div className="page-wrapper">
        <div className="flex-left">
          <div className="form">
            <form onSubmit={attemptLogin}>
              <h1 className="major">Login</h1>
              <label>email</label>
              <input
                id="email-input"
                type="email"
                onChange={handleEmail}
              ></input>
              <label>password</label>
              <input
                id="password-input"
                type="password"
                onChange={handlePassword}
              ></input>
              <input type="submit" value="subm" />
            </form>
          </div>
        </div>
        <div className="flex-right">test1</div>
      </div>
    </div>
  );
};

export default Login;
