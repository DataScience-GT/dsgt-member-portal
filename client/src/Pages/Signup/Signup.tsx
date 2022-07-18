import React, { FC } from "react";
import InputField from "../../components/InputField/InputField";
import styles from "./Signup.module.scss";

interface SignupProps {}

const Signup: FC<SignupProps> = () => (
  <div className={styles.Signup} data-testid="Signup">
    <InputField type="text" placeholder="First Name" />
    <InputField type="text" placeholder="Last Name" />
    <InputField type="email" placeholder="Email" />
    <InputField type="password" placeholder="Password" />
  </div>
);

export default Signup;
