import React, { FC, useEffect, useState } from "react";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import SuccessText from "../../components/SuccessText/SuccessText";
import styles from "./PortalAnnounce.module.scss";

interface PortalAnnounceProps {}

const PortalAnnounce: FC<PortalAnnounceProps> = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (message.length <= 2) {
      setError("Announcement too short.");
      return;
    }
    setShowModal(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const handleModalConfirm = async () => {
    setSuccess("");
    await fetch("/api/announcement/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        session_id: localStorage.getItem("dsgt-portal-session-key"),
        announcement: message,
      }),
    }).then(async (res) => {
      const json = await res.json();
      if (!json.ok && json.error) {
        setError(json.error);
      } else {
        //announcement sent
        setSuccess("Announcement has been sent!");
      }
    });
  };

  return (
    <div className={styles.PortalAnnounce} data-testid="PortalAnnounce">
      <h1 className={styles.Major}>Announce</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.TextBox}
          placeholder="Type your announcement message here..."
          onChange={handleChange}
        ></textarea>
        <ErrorText>{error}</ErrorText>
        <SuccessText>{success}</SuccessText>
        <InputField placeholder="Send" type={"submit"} width="fit-content" />
      </form>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        preset={ModalPreset.Confirm}
        handleConfirmed={handleModalConfirm}
      >
        Are you sure you would like to send the following announcement?
        <span className={styles.AnnConfirm}>{message}</span>
      </Modal>
    </div>
  );
};

export default PortalAnnounce;
