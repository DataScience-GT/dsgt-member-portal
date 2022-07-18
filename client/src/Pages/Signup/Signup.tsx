import React, { FC, useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./Signup.module.scss";

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
          <div className={`${styles.PanelHalf} ${styles.PanelLeft}`}></div>
          <div className={`${styles.PanelHalf}`}></div>
        </FlexRow>
      </div>
    </div>
  );
};

{
  /* <InputField
        type="text"
        placeholder="First Name"
        onChange={handleChange_fname}
      />
      <InputField
        type="text"
        placeholder="Last Name"
        onChange={handleChange_lname}
      />
      <InputField
        type="email"
        placeholder="Email"
        onChange={handleChange_email}
      />
      <InputField
        type="password"
        placeholder="Password"
        onChange={handleChange_password}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        helper={<InputHelper lines={passwordHelperLines} />}
      />
      <InputField type="submit" /> */
}

export default Signup;
