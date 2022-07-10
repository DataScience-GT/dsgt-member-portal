import "./Login.css";

const Login = (params) => {
  return (
    <div id="login-page">
      <div className="page-wrapper">
        <div className="flex-left">
          <div className="form">
            <form action="/api" method="get">
              <h1 className="major">Login</h1>
              <label>email</label>
              <input id="email-input" type="email"></input>
              <label>password</label>
              <input id="password-input" type="password"></input>
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
