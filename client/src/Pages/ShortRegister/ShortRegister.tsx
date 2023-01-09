import React, { FC, useState, useEffect } from "react";
import {
  checkBillingDetailsExists,
  registerUser,
  registerUserShort,
} from "../../API/Register";
import ErrorText from "../../components/ErrorText/ErrorText";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
import Loader from "../../components/Loader/Loader";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./ShortRegister.module.scss";

interface ShortRegisterProps {}

const passwordHelperLines = [
  "Requires:",
  "1 Capital Letter",
  "1 Lowercase Letter",
  "1 Number",
  "8 Total Characters",
];

const ShortRegister: FC<ShortRegisterProps> = () => {
  // whether loading
  const [loading, setLoading] = useState(false);
  // whether email is verified
  const [emailVerified, setEmailVerified] = useState(false);
  // any error messages
  const [error, setError] = useState("");
  // email
  const [email, setEmail] = useState("");
  // first name
  const [fname, setFname] = useState("");
  // last name
  const [lname, setLname] = useState("");
  // password
  const [password, setPassword] = useState("");

  //handle all of the form elements updating (save input to state)
  const handleChange_fname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setFname(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };
  const handleChange_lname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setLname(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_password = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleFirstSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //
    await checkBillingDetailsExists(email, (data) => {
      if (data.data.account) {
        // account already exists
        setError("An account with this email already exists.");
      } else {
        setError("");
        setEmailVerified(true);
      }
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShortRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(fname && lname && password)) {
      setError("Please fill out all fields.");
      return;
    }
    // create account
    await registerUserShort(email, fname, lname, password, (data) => {
      if (data.ok) {
        localStorage.setItem("dsgt-portal-session-key", data.session_key);
        window.location.href = "/portal";
      }
    }).catch((err) => {
      setError(err.message);
    });
  };

  if (loading) {
    return (
      <div className={styles.ShortRegister} data-testid="ShortRegister">
        <FlexRow spacing="center" align="center" height="100vh" padding="1em">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Loader />
          </div>
        </FlexRow>
      </div>
    );
  } else if (!emailVerified) {
    return (
      <div className={styles.ShortRegister} data-testid="ShortRegister">
        <FlexRow spacing="center" align="center" height="100vh" padding="1em">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Form width="100%" onSubmit={handleFirstSubmit}>
              <h2 className={styles.Minor}>
                Please enter the email associated with your account:
              </h2>
              <InputField
                type={"email"}
                placeholder={"Email"}
                width={"100%"}
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              ></InputField>
              {error && <ErrorText>{error}</ErrorText>}
            </Form>
          </div>
        </FlexRow>
      </div>
    );
  } else {
    return (
      <div className={styles.ShortRegister} data-testid="ShortRegister">
        <FlexRow spacing="center" align="center" height="100vh" padding="1em">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Form width="100%" onSubmit={handleShortRegister}>
              <h1 className={styles.Minor}>
                Please enter the following information:
              </h1>
              <FlexRow gap="10px" spacing={"space-between"} width="100%">
                <InputField
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  width="45%"
                  onChange={handleChange_fname}
                  validIndication
                  required
                />
                <InputField
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  width="45%"
                  onChange={handleChange_lname}
                  validIndication
                  required
                />
              </FlexRow>
              <InputField
                type="password"
                placeholder="Account Password"
                name="password"
                onChange={handleChange_password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                width="100%"
                helper={<InputHelper lines={passwordHelperLines} />}
                validIndication
                required
              />
              {error && <ErrorText>{error}</ErrorText>}
            </Form>
          </div>
        </FlexRow>
      </div>
    );
  }
};

export default ShortRegister;
