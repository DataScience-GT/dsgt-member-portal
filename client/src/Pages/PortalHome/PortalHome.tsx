import React, { FC, useContext, useEffect, useState } from "react";
import Announcement from "../../components/Announcement/Announcement";
import EventCard from "../../components/EventCard/EventCard";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalHome.module.scss";

interface PortalHomeProps {}

const PortalHome: FC<PortalHomeProps> = () => {
  const [messages, setMessages] = useState([
    "Hello, {name}.",
    "Welcome back, {name}.",
  ]);
  const [secondaryMessage, setSecondaryMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  const addWelcomeMessage = (message: string) => {
    const list = messages.concat(message);
    setMessages(list);
  };

  useEffect(() => {
    const now = new Date();
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
    const offset = -300;
    const est = new Date(utc.getTime() + offset * 60 * 1000);
    const hours = est.getHours();

    if (hours >= 0 && hours < 8) {
      //0-8
      addWelcomeMessage("Good Morning, {name}.");
      setSecondaryMessage("Up early or staying up late?");
    } else if (hours >= 8 && hours < 12) {
      //8-12
      addWelcomeMessage("Good Morning, {name}.");
    } else if (hours >= 12 && hours < 15) {
      //12-5
      addWelcomeMessage("Good Afternoon, {name}.");
    } else if (hours >= 15 && hours < 24) {
      //15-24
      addWelcomeMessage("Good Evening, {name}.");
    }

    //get last ~5 announcements
    const getAnnouncements = async () => {
      await fetch("/api/announcement/get?count=5", {
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
    <div className={styles.PortalHome} data-testid="PortalHome">
      <FlexRow spacing="space-between">
        <div className={styles.FlexLeft}>
          <h1 className={styles.Major} style={{ textTransform: "capitalize" }}>
            {messages[Math.floor(Math.random() * messages.length)].replaceAll(
              "{name}",
              localStorage.getItem("dsgt-portal-fname") || "User"
            )}
          </h1>
          <h2 className={styles.Minor}>{secondaryMessage}</h2>
          <br />
          <h2 className={styles.Minor}>Upcoming Events</h2>
          <div className={styles.Cards}>
            <EventCard big></EventCard>
            {/* <EventCard big></EventCard> */}
            {/* <EventCard big></EventCard> */}
            <EventCard></EventCard>
            <EventCard></EventCard>
          </div>
        </div>
        <div className={styles.Announcements}>
          <div className={styles.Minor}>Announcements</div>
          <FlexColumn>
            {loading
              ? "loading..."
              : announcements.length <= 0
              ? "No announcements found."
              : announcements.map((a, i) => {
                  return (
                    <Announcement
                      when={new Date(a["created_at"])}
                      from={`${a["fname"]} ${a["lname"]}`}
                    >
                      {a["message"]}
                    </Announcement>
                  );
                })}
          </FlexColumn>
        </div>
      </FlexRow>
    </div>
  );
};

export default PortalHome;
