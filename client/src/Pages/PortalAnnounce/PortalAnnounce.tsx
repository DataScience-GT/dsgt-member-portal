import React, { FC, useState } from "react";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import styles from "./PortalAnnounce.module.scss";

interface PortalAnnounceProps {}

const PortalAnnounce: FC<PortalAnnounceProps> = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (message.length <= 2) {
      setError("Announcement too short.");
      return;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };
  return (
    <div className={styles.PortalAnnounce} data-testid="PortalAnnounce">
      <h1 className={styles.Major}>Announce</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.TextBox}
          placeholder="Announcement Message"
          onChange={handleChange}
        ></textarea>
        <ErrorText>{error}</ErrorText>
        <InputField placeholder="Send" type={"submit"} width="fit-content" />
      </form>
    </div>
  );
};

export default PortalAnnounce;
