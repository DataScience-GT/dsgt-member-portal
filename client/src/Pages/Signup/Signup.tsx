import React, { FC } from "react";
import InputField from "../../components/InputField/InputField";
import styles from "./Signup.module.scss";

interface SignupProps {}

const Signup: FC<SignupProps> = () => {
  const handleChange_fname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleChange_lname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleChange_email = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleChange_password = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    //introduce states for each value and prevent/allow certain chars
    <div className={styles.Signup} data-testid="Signup">
      <InputField
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
      />
      <InputField type="submit" />
    </div>
  );
};

export default Signup;
