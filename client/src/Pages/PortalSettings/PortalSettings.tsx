import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import SuccessText from "../../components/SuccessText/SuccessText";
import ThemeDropdown from "../../components/ThemeDropdown/ThemeDropdown";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalSettings.module.scss";

import packageJson from "../../../package.json";

interface PortalSettingsProps {}

const PortalSettings: FC<PortalSettingsProps> = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [o_fname, o_setFname] = useState("");
  const [o_lname, o_setLname] = useState("");

  useEffect(() => {
    // /user/self
    const getSelfInfo = async () => {
      await fetch("/api/user/self", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({
          session_id: localStorage.getItem("dsgt-portal-session-key"),
        }),
      }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
          setError(json.error);
        } else {
          //save original data
          setFname(json.data["fname"]);
          setLname(json.data["lname"]);
          o_setFname(json.data["fname"]);
          o_setLname(json.data["lname"]);
        }
        setLoading(false);
      });
    };
    getSelfInfo();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    //make sure the new value is different than the original value
    console.log(fname, o_fname, lname, o_lname);
    if (fname !== o_fname || lname !== o_lname) {
      //change user info
      await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({
          session_id: localStorage.getItem("dsgt-portal-session-key"),
          user_fname: fname,
          user_lname: lname,
        }),
      }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
          setError(json.error);
        } else {
          //success -- set original as new names
          setSuccess("saved.");
          o_setFname(fname);
          o_setLname(lname);
        }
        setLoading(false);
      });
    } else {
      setError("Values not changed.");
    }
  };
  const handleFnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFname(e.currentTarget.value);
  };
  const handleLnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLname(e.currentTarget.value);
  };
  //setup handlers and state for each input field
  return (
    <div className={styles.PortalSettings} data-testid="PortalSettings">
      <h1 className={styles.Major}>Settings</h1>
      <h2 className={styles.Minor}>Account Settings</h2>
      {/* Change fname, lname, password */}
      {loading ? (
        <div>loading...</div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <FlexColumn padding="1em 0 0 0">
            <FlexRow gap="20px">
              <InputField
                placeholder="First Name"
                type="text"
                width="45%"
                originalValue={fname}
                onChange={handleFnameChange}
              />
              <InputField
                placeholder="Last Name"
                type="text"
                width="45%"
                originalValue={lname}
                onChange={handleLnameChange}
              />
            </FlexRow>
            <ErrorText>{error}</ErrorText>
            <SuccessText>{success}</SuccessText>
            <InputField placeholder="Save" type="submit" width="auto" />
          </FlexColumn>
        </form>
      )}
      <a className={styles.Link} href="/passwordreset">
        Reset Password
      </a>
      <h2 className={styles.Minor}>Portal Settings</h2>
      <p className={styles.Mini}>Theme</p>
      <ThemeDropdown />
      <br />
      <h2 className={styles.Minor}>Version</h2>
      <p className={styles.Mini}>v{packageJson.version}</p>
    </div>
  );
};

export default PortalSettings;
