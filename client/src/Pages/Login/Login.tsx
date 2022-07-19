import React, { FC, useState } from "react";
import InputField from "../../components/InputField/InputField";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./Login.module.scss";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle all of the form elements updating (save input to state)
  const handleChange_fname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setFname(e.target.value);
  };
  const handleChange_lname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setLname(e.target.value);
  };
  const handleChange_email = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "");
    setEmail(e.target.value);
  };
  const handleChange_password = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //~`! @#$%^&*()_-+={[}]|\:;"'<,>.?/
    // e.target.value = e.target.value.replace(
    //   /[^a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
    //   ""
    // );
    setPassword(e.target.value);
  };

  //handle form submission
  const handleSubmit = async () => {
    await fetch("/api").then(async (res) => {
      const json = await res.text();
      console.log(json);
    });
  };

  return (
    <div className={styles.Login} data-testid="Login">
      <div className={styles.Panel}>
        <FlexRow height="100%">
          <div className={`${styles.PanelHalf}`}>
            <FlexColumn
              spacing="center"
              align="center"
              height="100%"
              width="100%"
              padding="0 20%"
            >
              <h1 className={styles.Header}>Welcome Back!</h1>
              <InputField
                type="email"
                placeholder="Email"
                width="100%"
                onChange={handleChange_email}
              />
              <InputField
                type="password"
                placeholder="Password"
                onChange={handleChange_password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                width="100%"
              />
              <InputField
                type="submit"
                placeholder="Login"
                width="100%"
                onClick={handleSubmit}
              />
              <div className={styles.Divider}></div>
              <div className={styles.bottom}>
                <FlexRow
                  spacing="space-between"
                  align="center"
                  height="fit-content"
                  width="100%"
                >
                  <h3 className={styles.mini}>I need an account:</h3>
                  <a className={styles.InlineButton} href="/signup">
                    Sign Up
                  </a>
                </FlexRow>
              </div>
            </FlexColumn>
          </div>
          <div className={`${styles.PanelHalf} ${styles.PanelRight}`}></div>
        </FlexRow>
      </div>
    </div>
  );
};

export default Login;
