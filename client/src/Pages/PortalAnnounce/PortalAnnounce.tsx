import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Announcement from "../../components/Announcement/Announcement";
import ErrorText from "../../components/ErrorText/ErrorText";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import SuccessText from "../../components/SuccessText/SuccessText";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalAnnounce.module.scss";

interface PortalAnnounceProps {}

const PortalAnnounce: FC<PortalAnnounceProps> = () => {
  // New announcement
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  // const [verifiedEmails, setVerifiedEmails] = useState([]);

  // Existing announcements
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(-1);
  const [error2, setError2] = useState("");
  const [success2, setSuccess2] = useState("");

  /**
   * On submit announcement, calls showSendModal. Checks for announcement length
   * not less than 3 chars.
   * @param e submit click
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (message.length <= 2) {
      setError("Announcement too short.");
      return;
    }
    setShowSendModal(true);
  };

  /**
   * Handles change on announcement message.
   * @param e new character in textfield
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  // const collectAllVerifiedEmails = async () => {
  //
  // }

  /**
   * Added priority with sendEmail boolean. Thus, confirmation of announcement
   * can distinguish whether to send email or not.
   */
  const handleSendModalConfirm = async () => {
    setSuccess("");
    setError("");
    // if (sendEmail) {
    //   await getUsersWithVerifiedEmail();
    // }
    await fetch("/api/announcement/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        session_id: localStorage.getItem("dsgt-portal-session-key"),
        announcement: message,
        sendToEmail: sendEmail,
        // verifiedEmails: verifiedEmails,
      }),
    }).then(async (res) => {
      const json = await res.json();
      if (!json.ok && json.error) {
        setError(json.error);
      } else {
        // Announcement sent with email
        if (sendEmail) {
          setSuccess(
            "Announcement has been sent! In addition, email has been sent" +
              " to all verified DSGT members."
          );
        } else {
          // No email
          setSuccess("Announcement has been sent! No email was sent.");
        }
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

  /**
   * Makes a call to get users with verified email.
   */
  // const getUsersWithVerifiedEmail = async () => {
  //   await fetch("/api/user/get", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       session_id: localStorage.getItem("dsgt-portal-session-key"),
  //       sendToEmail: sendEmail
  //     }),
  //   }).then(async (res) => {
  //     const json = await res.json();
  //     if (!json.ok && json.error) {
  //       console.error(json.error);
  //     } else {
  //       setVerifiedEmails(json.data);
  //     }
  //     setLoading(false);
  //   });
  // };

  // Get all announcements
  useEffect(() => {
    // Get all announcements
    const getAnnouncements = async () => {
      await fetch(
        `/api/announcement/get?session_id=${localStorage.getItem(
          "dsgt-portal-session-key"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      ).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
          console.error(json.error);
        } else {
          // Use data
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
      <FlexRow gap="5em" wrap="wrap-reverse" align="flex-start">
        <>
          <Form
            onSubmit={handleSubmit}
            submitPlaceholder="Create"
            width="40%"
            minWidth="300px"
          >
            <textarea
              className={styles.TextBox}
              placeholder="Type your announcement message here..."
              onChange={handleChange}
            ></textarea>
            <ErrorText>{error}</ErrorText>
            <SuccessText>{success}</SuccessText>
            <InputField
              type={"url"}
              name="link"
              placeholder="Link URL"
              onChange={(e) => {
                setLinkUrl(e.currentTarget.value);
              }}
            />
            <InputField
              type={"text"}
              name="link-text"
              placeholder="Link Text"
              onChange={(e) => setLinkText(e.currentTarget.value)}
            />
            <div>
              <input
                type="checkbox"
                id="sendEmail"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSendEmail(e.currentTarget.checked);
                  console.log(e.currentTarget.checked);
                }}
                name="sendEmail"
              />
              <label
                className={styles.Minor}
                htmlFor="sendEmail"
                style={{ padding: "0 0 0 0.5em" }}
              >
                Send email?
              </label>
            </div>
          </Form>
          <div className={styles.SideBySide}>
            <FlexColumn gap="20px">
              <h1 className={styles.Minor}>
                Here's what your announcement will look like to members:
              </h1>
              <Announcement
                when={new Date()}
                from={localStorage.getItem("dsgt-portal-fname")?.toString()}
                link_text={linkText}
                link_url={linkUrl}
              >
                {message || "No message"}
              </Announcement>
            </FlexColumn>
          </div>
        </>
      </FlexRow>
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
