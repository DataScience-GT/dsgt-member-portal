import React, { FC, InputHTMLAttributes, useState } from "react";
import InputField from "../../components/InputField/InputField";
import ThemeDropdown from "../../components/ThemeDropdown/ThemeDropdown";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalSettings.module.scss";

interface PortalSettingsProps {}

const PortalSettings: FC<PortalSettingsProps> = () => {
  const [fname, setFname] = useState("John");
  const [lname, setLname] = useState("Ramberger");
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`fname: ${fname}, lname: ${lname}`);
    //make sure the new value is different than the original value
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
      <form onSubmit={handleFormSubmit}>
        <FlexColumn>
          <FlexRow gap={20}>
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
          <InputField placeholder="Save" type="submit" />
        </FlexColumn>
      </form>
      <h2 className={styles.Minor}>Portal Settings</h2>
      <p className={styles.Mini}>Theme</p>
      <ThemeDropdown />
    </div>
  );
};

export default PortalSettings;
