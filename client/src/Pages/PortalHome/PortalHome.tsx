import React, { FC, useContext, useEffect, useState } from "react";
import { EventListType, getEvents, result_getEvents } from "../../API/Event";
import Announcement from "../../components/Announcement/Announcement";
import EventCard from "../../components/EventCard/EventCard";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalHome.module.scss";
import { compareUserRoles } from "../../Scripts/RoleManagement";

interface PortalHomeProps {
  role?: string;
}

setInterval(() => {
  sessionStorage.setItem('counts_as_view', 'true');
}, 60 * 60 * 1000); // 1 hour in milliseconds

const PortalHome: FC<PortalHomeProps> = ({ role }: PortalHomeProps) => {

  const [messages, setMessages] = useState([
    "Welcome back, {name}.",
  ]);
  const [secondaryMessage, setSecondaryMessage] = useState("");

  const [annLoading, setAnnLoading] = useState(true);
  const [eventLoading, setEventLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState<result_getEvents[]>([]);
  const [ongoingEvents, setOngoingEvents] = useState<result_getEvents[]>([]);

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

    if (!sessionStorage.getItem('counts_as_view')) {
      sessionStorage.setItem('counts_as_view', 'true');
    }
    const counts_as_view: string | null = sessionStorage.getItem('counts_as_view');

    // get last 1-10 announcements and increment views as needed
    const getAnnouncements = async (counts_as_view: boolean) => {
      await fetch(
        `/api/announcement/get?count=10
          &counts_as_view=${counts_as_view}
          &session_id=${localStorage.getItem(
            "dsgt-portal-session-key")}`,
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
          setAnnouncements(json.data);
          if (counts_as_view) {
            console.log('Updated view count on all announcements!');
            sessionStorage.setItem('counts_as_view', 'false');
          } else {
            console.log('Did not update view count');
          }
        }
        setAnnLoading(false);
      })
    };
    getAnnouncements(JSON.parse(counts_as_view || 'false'));

    // get upcoming events
    const getEventDataUpcoming = async () => {
      await getEvents(
        3,
        EventListType.Upcoming,
        (result: result_getEvents[]) => {
          setUpcomingEvents(result);
          setEventLoading(false);
        }
      ).catch(console.error);
    };
    getEventDataUpcoming();

    // get ongoing events
    const getEventDataOngoing = async () => {
      await getEvents(
        3,
        EventListType.Ongoing,
        (result: result_getEvents[]) => {
          setOngoingEvents(result);
        }
      ).catch(console.error);
    };
    getEventDataOngoing();
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
          {ongoingEvents.length <= 0 ? (
            ""
          ) : (
            <div>
              <h2 className={styles.Minor}>Ongoing Events</h2>
              <p className={styles.Mini}>
                Don't miss the chance to attend these events!
              </p>
              <div className={styles.Cards}>
                {" "}
                {ongoingEvents.map((e, i) => {
                  return (
                    <EventCard
                      key={i}
                      name={e.name}
                      location={e.location}
                      imageSRC={e.imageData}
                      shortDescription={e.shortDescription}
                      longDescription={e.longDescription}
                      startDate={e.startDate}
                      startTime={e.startTime}
                      endDate={e.endDate}
                      endTime={e.endTime}
                      link={e.link}
                      big={i === 0 ? true : false}
                    ></EventCard>
                  );
                })}
              </div>
            </div>
          )}
          <h2 className={styles.Minor}>Upcoming Events</h2>
          <div className={styles.Cards}>
            {eventLoading
              ? "loading..."
              : upcomingEvents.length <= 0
              ? "No events found."
              : upcomingEvents.map((e, i) => {
                  return (
                    <EventCard
                      key={i}
                      name={e.name}
                      location={e.location}
                      imageSRC={e.imageData}
                      shortDescription={e.shortDescription}
                      longDescription={e.longDescription}
                      startDate={e.startDate}
                      startTime={e.startTime}
                      endDate={e.endDate}
                      endTime={e.endTime}
                      link={e.link}
                      big={i === 0 ? true : false}
                    ></EventCard>
                  );
                })}
          </div>
        </div>
        <div className={styles.Announcements}>
          {compareUserRoles(role || "guest", "professor") == 0 ? (
            <div className={styles.Minor}>Announcements & Research</div>
          ) : (
            <div className={styles.Minor}>Announcements & Research Opportunities</div>
          )}
          <FlexColumn>
                {annLoading
                  ? "loading..."
                  : announcements.length <= 0
                  ? "No announcements found."
                  : announcements.map((a, i) => {
                    return (
                          <Announcement
                            key={i}
                            when={new Date(a["created_at"])}
                            from={`${a["fname"]} ${a["lname"]}`}
                            id={a["ann_id"]}
                            view_count={a["view_count"]}
                            link_url={a["link_url"]}
                            link_text={a["link_text"]}
                            role={role}
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
