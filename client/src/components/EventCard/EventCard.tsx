import React, { FC } from "react";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import styles from "./EventCard.module.scss";

import trash_icon from "../../assets/icons/trash.svg";

interface EventCardProps {
  // The name of the event
  name?: string;
  // The event location
  location?: string;
  // A short-hand event description
  shortDescription?: string;
  // An extended event description
  longDescription?: string;
  // The event start date
  startDate?: string;
  // The event start time
  startTime?: string;
  // The event end date
  endDate?: string;
  // The event end time
  endTime?: string;
  // The link to an associated event image
  imageSRC?: string;
  // Represents whether the event card includes the long or short description
  big?: boolean;
  // Whether the event card scrolls with the screen
  sticky?: boolean;
  // Link for the "Learn More" button after the event description
  link?: string;
  // Whether the event card is deletable
  deletable?: boolean;
}

// Functional component, renders EventCards on homepage
const EventCard: FC<EventCardProps> = ({
  name,
  location,
  shortDescription,
  longDescription,
  startDate,
  startTime,
  endDate,
  endTime,
  imageSRC,
  big,
  sticky,
  link,
  deletable,
}: EventCardProps) => {
  const format_month = "short";
  const format_day = "numeric";
  const format_hour = "numeric";
  const format_minute = "numeric";

  // Retrieves the start & end dates and checks if they are in the current year
  let leftDate = [];
  let sameYear = false;
  if (startDate && endDate) {
    let sd = new Date(startDate);
    let ed = new Date(endDate);
    let now = new Date();
    if (
      sd.getFullYear() === now.getFullYear() &&
      sd.getFullYear() === ed.getFullYear()
    ) {
      sameYear = true;
    }
  } else if (startDate) {
    let sd = new Date(startDate);
    let now = new Date();
    if (sd.getFullYear() === now.getFullYear()) {
      sameYear = true;
    }
  } else if (endDate) {
    let ed = new Date(endDate);
    let now = new Date();
    if (ed.getFullYear() === now.getFullYear()) {
      sameYear = true;
    }
  }

  // Formats dates and times in English-readable format "MM/DD/YYYY, XX:XX AM/PM"
  if (startDate && startTime) {
    let d = new Date(`${startDate} ${startTime}`);
    if (sameYear) {
      leftDate.push(
        d.toLocaleDateString("en-us", { month: format_month, day: format_day })
      );
    } else {
      leftDate.push(d.toLocaleDateString("en-us"));
    }

    leftDate.push(
      d.toLocaleTimeString("en-us", {
        hour: format_hour,
        minute: format_minute,
      })
    );
  } else if (startDate) {
    let sd = new Date(`${startDate} 12:00`);
    if (sameYear) {
      leftDate.push(
        sd.toLocaleDateString("en-us", { month: format_month, day: format_day })
      );
    } else {
      leftDate.push(sd.toLocaleDateString("en-us"));
    }
  }
  // } else if (startTime) {
  //   let st = new Date(startTime);
  //   leftDate.push(st.toLocaleTimeString("en-us"));
  // }
  let rightDate = [];
  if (endDate && endTime) {
    let d = new Date(`${endDate} ${endTime}`);
    if (sameYear) {
      rightDate.push(
        d.toLocaleDateString("en-us", { month: format_month, day: format_day })
      );
    } else {
      rightDate.push(d.toLocaleDateString("en-us"));
    }
    rightDate.push(
      d.toLocaleTimeString("en-us", {
        hour: format_hour,
        minute: format_minute,
      })
    );
  } else if (endDate) {
    let ed = new Date(`${endDate} 12:00`);
    if (sameYear) {
      rightDate.push(
        ed.toLocaleDateString("en-us", { month: format_month, day: format_day })
      );
    } else {
      rightDate.push(ed.toLocaleDateString("en-us"));
    }
  }
  // Formats the start & end dates/times for rendering
  let datetime = "";
  const joinSymbol = ", ";
  if (leftDate.length && rightDate.length) {
    datetime = `${leftDate.join(joinSymbol)} to ${rightDate.join(joinSymbol)}`;
  } else if (leftDate.length) {
    datetime = leftDate.join(joinSymbol);
  } else if (rightDate.length) {
    datetime = rightDate.join(joinSymbol);
  }

  // Decides which event description to show
  let desc = "Event Description 1";

  if (big) {
    if (longDescription) {
      desc = longDescription;
    } else if (shortDescription) {
      desc = shortDescription;
    }
  } else if (shortDescription) {
    desc = shortDescription;
  }

  // Check if the event is ongoing
  let ongoing = false;
  let timeLeft = "";
  if (startDate && endDate) {
    let now = new Date();
    let sd = new Date(`${startDate} ${startTime}`);
    let ed = new Date(`${endDate} ${endTime}`);

    if (now.getTime() <= ed.getTime() && now.getTime() >= sd.getTime()) {
      ongoing = true;
      // Calculate time until the end of the event
      let milliseconds = ed.getTime() - now.getTime();
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      let months = Math.floor(days / 30.5);
      let years = Math.floor(days / 365);

      seconds = seconds % 60;
      minutes = minutes % 60;
      hours = hours % 24;
      days = Math.floor(days % 30.5);
      months = months % 12;

      let times = [];
      if (years) {
        times.push(years + "y");
      }
      if (months) {
        times.push(months + "mo");
      }
      if (days) {
        times.push(days + "d");
      }
      if (hours) {
        times.push(hours + "h");
      }
      if (minutes) {
        times.push(minutes + "min");
      }

      timeLeft = `${times.join(" ")} left`;
    }
  }

  // Actual frontend rendering
  return (
    <div
      className={`${styles.EventCard} ${big ? styles.BigEventCard : ""} ${
        sticky ? styles.StickyEventCard : ""
      }`}
      data-testid="EventCard"
    >
      <div
        className={`${styles.Image}`}
        style={{ backgroundImage: `url(${imageSRC})` }}
      >
        {deletable ? (
          <div className={styles.DeleteButton}>
            <img src={trash_icon} alt="click to delete" />
          </div>
        ) : (
          ""
        )}
        {/* <img src={imageSRC} alt={name} /> */}
      </div>
      <div className={styles.Content}>
        <FlexColumn height="100%" wrap="nowrap">
          <p className={styles.When}>{datetime}</p>
          <p className={styles.Countdown}>{ongoing ? timeLeft : ""}</p>
          <p className={styles.Location}>{location}</p>
          <h1 className={styles.Major}>{name ? name : "Event Name"}</h1>
          <p className={styles.Description}>{desc}</p>
          {link ? (
            <a
              className={styles.Link}
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
          ) : (
            ""
          )}
        </FlexColumn>
      </div>
    </div>
  );
};

export default EventCard;
