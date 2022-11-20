import React, { FC, useEffect, useState } from "react";
import Announcement from "../../components/Announcement/Announcement";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import SuccessText from "../../components/SuccessText/SuccessText";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import styles from "./PortalAnnounce.module.scss";
import {getAnnouncementEmailTemplate} from "../../EmailTemplate/AnnouncementEmail";
import {sendEmail} from "../../../../email";
import {getAllMembers} from "../../../../model";
import express, { Request, Response, NextFunction } from "express";

interface PortalAnnounceProps {}

const PortalAnnounce: FC<PortalAnnounceProps> = () => {
  // New announcement
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [showSendModal, setShowSendModal] = useState(false);

  // Existing announcements
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(-1);
  const [error2, setError2] = useState("");
  const [success2, setSuccess2] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (message.length <= 2) {
      setError("Announcement too short.");
      return;
    }
    setShowSendModal(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const handleSendModalConfirm = async () => {
    setSuccess("");
    setError("");
    console.log(message);
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
        // Announcement sent
        setSuccess("Announcement has been sent!");
        // let emailList = getAllMembers().select("email").where("email_consent");
      }
    });
  };

  const handleDelModalConfirm = async () => {
    setSuccess2("");
    setError2("");
    await fetch("/api/announcement/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        session_id: localStorage.getItem("dsgt-portal-session-key"),
        announcement_id: currentAnnouncementId,
      }),
    }).then(async (res) => {
      const json = await res.json();
      if (!json.ok && json.error) {
        setError2(json.error);
      } else {
        // Announcement sent
        setSuccess2("Announcement has been deleted!");
        document
          .querySelector(`[data-announcement-id="${currentAnnouncementId}"]`)
          ?.remove();
        setCurrentAnnouncementId(-1);
      }
    });
  };

  // Get all announcements
  useEffect(() => {
    // Get all announcements
    const getAnnouncements = async () => {
      await fetch("/api/announcement/get", {
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
          console.error(json.error);
        } else {
          //use data
          setAnnouncements(json.data);
        }
        setLoading(false);
      });
    };
    getAnnouncements();
  }, []);

  return (
    <div className={styles.PortalAnnounce} data-testid="PortalAnnounce">
      <h1 className={styles.Major}>Announcements</h1>
      <h2 className={styles.Minor}>Send Announcement</h2>
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
        open={showSendModal}
        setOpen={setShowSendModal}
        preset={ModalPreset.Confirm}
        handleConfirmed={handleSendModalConfirm}
      >
        Are you sure you would like to send the following announcement?
        <span className={styles.AnnConfirm}>{message}</span>
      </Modal>

      <h2 className={styles.Minor}>Existing Announcements</h2>
      <ErrorText>{error2}</ErrorText>
      <SuccessText>{success2}</SuccessText>
      {loading ? (
        <div>loading...</div>
      ) : (
        <FlexColumn>
          {announcements.length <= 0
            ? "No announcements found."
            : announcements.map((a, i) => {
                return (
                  <Announcement
                    key={i}
                    when={new Date(a["created_at"])}
                    from={`${a["fname"]} ${a["lname"]}`}
                    id={a["ann_id"]}
                    deletable={true}
                    onDelete={(announcement_id?: number) => {
                      setShowDelModal(true);
                      if (announcement_id)
                        setCurrentAnnouncementId(announcement_id);
                    }}
                  >
                    {a["message"]}
                  </Announcement>
                );
              })}
        </FlexColumn>
      )}
      <Modal
        open={showDelModal}
        setOpen={setShowDelModal}
        preset={ModalPreset.Confirm}
        handleConfirmed={handleDelModalConfirm}
      >
        Are you sure you would like to delete this announcement?
      </Modal>
    </div>
  );
};

export default PortalAnnounce;
