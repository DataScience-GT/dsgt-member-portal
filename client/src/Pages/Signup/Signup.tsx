import React, { FC, useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./Signup.module.scss";

import DSGTLogo from "../../assets/images/logos-20.png";

interface SignupProps {}

const passwordHelperLines = [
  "Requires:",
  "1 Capital Letter",
  "1 Lowercase Letter",
  "1 Number",
  "8 Total Characters",
];

const Signup: FC<SignupProps> = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    //introduce states for each value and prevent/allow certain chars
    <div className={styles.Signup} data-testid="Signup">
      <div className={styles.Panel}>
        <FlexRow height="100%">
          <div className={`${styles.PanelHalf} ${styles.PanelLeft}`}>
            <img src={DSGTLogo} alt="DSGT Logo" />
          </div>
          <div className={`${styles.PanelHalf}`}>
            <FlexColumn
              spacing="center"
              align="center"
              height="100%"
              width="100%"
              padding="0 20%"
            >
              <h1 className={styles.Header}>Sign Up</h1>
              <InputField
                type="text"
                placeholder="First Name"
                width="100%"
                onChange={handleChange_fname}
                validIndication
              />
              <InputField
                type="text"
                placeholder="Last Name"
                width="100%"
                onChange={handleChange_lname}
                validIndication
              />
              <InputField
                type="email"
                placeholder="Email"
                width="100%"
                onChange={handleChange_email}
                validIndication
              />
              <InputField
                type="password"
                placeholder="Password"
                onChange={handleChange_password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                width="100%"
                helper={<InputHelper lines={passwordHelperLines} />}
                validIndication
              />
              <InputField type="submit" placeholder="Sign Up" width="100%" />
              <div className={styles.Divider}></div>
              <div className={styles.bottom}>
                <FlexRow
                  spacing="space-between"
                  align="center"
                  height="fit-content"
                  width="100%"
                >
                  <h3 className={styles.mini}>I already have an account:</h3>
                  <a className={styles.InlineButton} href="/login">
                    Login
                  </a>
                </FlexRow>
              </div>
            </FlexColumn>
          </div>
        </FlexRow>
      </div>
    </div>
  );
};

{
  /*  */
}

export default Signup;
