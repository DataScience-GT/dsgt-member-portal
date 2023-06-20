import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import Announcement from "../../components/Announcement/Announcement";
import ErrorText from "../../components/ErrorText/ErrorText";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import SuccessText from "../../components/SuccessText/SuccessText";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalAnnounce.module.scss";
import { compareUserRoles } from "../../Scripts/RoleManagement";
import trash_icon from "../../assets/icons/trash.svg";


interface PortalAnnounceProps {
  role?: string;
}

const PortalAnnounce: FC<PortalAnnounceProps> = ({ role }) => {

  // new announcement
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  // existing announcements
  const [loading, setLoading] = useState(true);  
  const [yourAnnouncements, setYourAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(-1);
  // const [currentAnnouncement, setCurrentAnnouncement] = useState(announcements[0]);
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

  /**
   * Sets current annnouncement based on announcement ID. Used for del modal.
   */
  // const handleAnnIDChange = () => {
  //   if (announcements.length > 0) {
  //     const announcement = announcements.find((item: { id: number | null; }) => item.id === currentAnnouncementId);
  //     setCurrentAnnouncement(announcement);
  //   }
  // }

  /**
   * Added priority with sendEmail boolean. Thus, confirmation of announcement
   * can distinguish whether to send email or not.
   */
  const handleSendModalConfirm = async () => {
    setSuccess("");
    setError("");
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
        linkUrl: linkUrl,
        linkText: linkText,
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

  // get all announcements
  useEffect(() => {
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
          // use data
          const filteredData = json.data.filter
              ((item: { fname: string | null; }) => item.fname === localStorage.getItem('dsgt-portal-fname'));
          setYourAnnouncements(filteredData);
          setAnnouncements(json.data);
        }
        setLoading(false);
      });
    };
    getAnnouncements();
  }, []);

  return (
    <div className={styles.PortalAnnounce} data-testid="PortalAnnounce">
      {compareUserRoles(role || "guest", "professor") == 0 ? (
        <><h1 className={styles.Major}>Research Postings</h1>
        <h2 className={styles.Minor}>Create Research Posting</h2></>
      ) : (
        <><h1 className={styles.Major}>Announcements</h1>
        <h2 className={styles.Minor}>Send Announcement</h2></>
      )}
      <FlexRow gap="5em" wrap="wrap-reverse" align="flex-start">
        <>
          <Form
            onSubmit={handleSubmit}
            submitPlaceholder="Create"
            width="40%"
            minWidth="300px"
          >
          {compareUserRoles(role || "guest", "professor") == 0 ? (
            <>
            <textarea
              className={styles.TextBox}
              placeholder="Type your research announcement here..."
              onChange={handleChange}
            ></textarea>
            </>
          ) : (
            <>
            <textarea
              className={styles.TextBox}
              placeholder="Type your announcement message here..."
              onChange={handleChange}
            ></textarea>
            </>
          )}
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
                className={styles.CheckBox}
                type="checkbox"
                id="sendEmail"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSendEmail(e.currentTarget.checked);
                  console.log(e.currentTarget.checked);
                }}
                name="sendEmail"
              />
              <label
                className={styles.CheckBox}
                htmlFor="sendEmail"
                style={{ padding: "0 0 0 0.5em" }}
              >
                Send email?
              </label>
            </div>
          </Form>
          <div className={styles.SideBySide}>
            <FlexColumn gap="20px">
            {compareUserRoles(role || "guest", "professor") == 0 ? (
              <><h1 className={styles.Minor}>Here's what your research posting will look like to members:</h1></>
            ) : (
              <><h1 className={styles.Minor}>Here's what your announcement will look like to members:</h1></>
            )}
              <Announcement
                when={new Date()}
                from={localStorage.getItem("dsgt-portal-fname")?.toString()}
                link_text={linkText}
                link_url={linkUrl}
              >{message || "No message"}
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
      <div className={styles.Warning}>
        {compareUserRoles(role || "guest", "professor") == 0 ? (
          <>Are you sure you would like to send the following research announcement?</>
        ) : (
          <>Are you sure you would like to send the following announcement?</>
        )}
        {sendEmail ? (
        <> An email WILL be sent to all active members.</>
        ) : (
        <> An email will NOT be sent to all active members.</>
        )}
      </div>
      <span className={styles.AnnConfirm}>
        <Announcement
          when={new Date()}
          from={localStorage.getItem("dsgt-portal-fname")?.toString()}
          link_text={linkText}
          link_url={linkUrl}
        >
        {message || "No message"}
        </Announcement>
      </span>
    </Modal>
    
    {compareUserRoles(role || "guest", "administrator") >= 0 ? (
      <>
      <h2 className={styles.Minor}>Active Posts</h2>
      <ErrorText>{error2}</ErrorText>
      <SuccessText>{success2}</SuccessText>
      {loading ? (
          <div>Loading...</div>
        ) : (
          
          <div className={styles.TableContainer}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>Announcement</th>
                <th>Links</th>
                <th>View Count</th>
                <th>Delete?</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length <= 0 ? (
                <tr>
                  <td colSpan={6}>No announcements found.</td>
                </tr>
              ) : (
                announcements.map((a, i) => {
                  return (
                    <tr className={styles.Table} key={i}>
                      <td>{new Date(a["created_at"]).toLocaleDateString()}</td>
                      <td className={styles.ExpandedColumn}>{`${a["fname"]} ${a["lname"]}`}</td>
                      <td>{a["message"]}</td>
                      <td>
                        {a["link_url"] && (
                          <a 
                            target="_blank"
                            rel="noreferrer"
                            className={styles.AnnouncementButton}
                            href={a["link_url"]}>
                            {a["link_text"] || "Learn More"}
                          </a>
                        )}
                        {}
                      </td>

                      <td className={styles.ExpandedColumn}>
                        {a["view_count"]} views
                      </td>

                      <td>
                        {(
                            <button className={styles.DeleteButton}
                              onClick={() => {
                                setShowDelModal(true);
                                setCurrentAnnouncementId(a["ann_id"]);
                              }}
                            >
                              Delete
                            </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>

          )}
      </>
    ) : (
      <>
      <h2 className={styles.Minor}>Your Active Posts</h2>
      <ErrorText>{error2}</ErrorText>
      <SuccessText>{success2}</SuccessText>
      {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.TableContainer}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>Announcement</th>
                <th>Links</th>
                <th>View Count</th>
                <th>Delete?</th>
              </tr>
            </thead>
            <tbody>
              {yourAnnouncements.length <= 0 ? (
                <tr>
                  <td colSpan={6}>No announcements found.</td>
                </tr>
              ) : (
                yourAnnouncements.map((a, i) => {
                  return (
                    <tr className={styles.Table} key={i}>
                      <td>{new Date(a["created_at"]).toLocaleDateString()}</td>
                      <td className={styles.ExpandedColumn}>{`${a["fname"]} ${a["lname"]}`}</td>
                      <td>{a["message"]}</td>
                      <td>
                        {a["link_url"] && (
                          <a 
                            target="_blank"
                            rel="noreferrer"
                            className={styles.AnnouncementButton}
                            href={a["link_url"]}>
                            {a["link_text"] || "Learn More"}
                          </a>
                        )}
                        {}
                      </td>

                      <td className={styles.ExpandedColumn}>
                        {a["view_count"]} views
                      </td>

                      <td>
                        {(
                            <button className={styles.DeleteButton}
                              onClick={() => {
                                setShowDelModal(true);
                                setCurrentAnnouncementId(a["ann_id"]);
                              }}
                            >
                              Delete
                            </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>
          )}
      </>
    )}

      <Modal
        open={showDelModal}
        setOpen={setShowDelModal}
        preset={ModalPreset.Confirm}
        handleConfirmed={handleDelModalConfirm}
      >
      <div className={styles.Warning}>
        Are you sure you would like to delete the announcement with announcement id {currentAnnouncementId}? 
        It cannot be obtained again.
      </div>

      </Modal>
  </div>
  );
};

export default PortalAnnounce;
