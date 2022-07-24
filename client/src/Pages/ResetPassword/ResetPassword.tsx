import React, { FC, useState } from "react";
import styles from "./ResetPassword.module.scss";
import { useSearchParams } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import ErrorText from "../../components/ErrorText/ErrorText";
import SuccessText from "../../components/SuccessText/SuccessText";
import InputHelper from "../../components/InputHelper/InputHelper";

interface ResetPasswordProps {}

const passwordHelperLines = [
  "Requires:",
  "1 Capital Letter",
  "1 Lowercase Letter",
  "1 Number",
  "8 Total Characters",
];

const ResetPassword: FC<ResetPasswordProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const reset_code = searchParams.get("reset_code");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [complete, setComplete] = useState(false);

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (complete) {
      setError("Already complete");
      return;
    }
    //initiate password reset
    await fetch("/api/user/resetpassword/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      const json = await res.json();
      if (!json.ok && json.error) {
        //error
        setError(json.error);
      } else {
        //success
        console.log(json);
        setSuccess("Email sent, expires in 10 minutes.");
        setComplete(true);
      }
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    //initiate password reset
    await fetch("/api/user/resetpassword/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ reset_code: reset_code, new_password: password }),
    }).then(async (res) => {
      const json = await res.json();
      if (!json.ok && json.error) {
        //error
        setError(json.error);
      } else {
        //success
        setSuccess("Password changed.");
        setComplete(true);
      }
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className={styles.ResetPassword} data-testid="ResetPassword">
      {reset_code ? (
        <div className={styles.Initiate}>
          <form onSubmit={handleChangePassword}>
            <FlexColumn
              width="100%"
              height="100vh"
              spacing="center"
              align="center"
            >
              <ErrorText>{error}</ErrorText>
              <SuccessText>{success}</SuccessText>
              <br />
              <InputField
                type={"password"}
                placeholder={"Password"}
                onChange={handlePasswordChange}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                helper={<InputHelper lines={passwordHelperLines} />}
                validIndication
              />
              <InputField type={"submit"} placeholder={"Save Password"} />
              {complete ? <a href="/login">Login</a> : ""}
            </FlexColumn>
          </form>
        </div>
      ) : (
        <div className={styles.Complete}>
          <form onSubmit={handleSendEmail}>
            <FlexColumn
              width="100%"
              height="100vh"
              spacing="center"
              align="center"
            >
              <ErrorText>{error}</ErrorText>
              <SuccessText>{success}</SuccessText>
              <br />
              <InputField
                type={"email"}
                placeholder={"Email"}
                onChange={handleEmailChange}
              />
              <InputField type={"submit"} placeholder={"Send Email"} />
            </FlexColumn>
          </form>
        </div>
      )}
    </div>
  );
};
export default ResetPassword;
