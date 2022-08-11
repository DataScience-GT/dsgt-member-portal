import React, { FC } from "react";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import styles from "./EventCard.module.scss";

interface EventCardProps {
  name?: string;
  location?: string;
  shortDescription?: string;
  longDescription?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  imageSRC?: string;
  big?: boolean;
  sticky?: boolean;
  link?: string;
}

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
}: EventCardProps) => {
  const format_month = "short";
  const format_day = "numeric";
  const format_hour = "numeric";
  const format_minute = "numeric";

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
  let datetime = "";
  const joinSymbol = ", ";
  if (leftDate.length && rightDate.length) {
    datetime = `${leftDate.join(joinSymbol)} to ${rightDate.join(joinSymbol)}`;
  } else if (leftDate.length) {
    datetime = leftDate.join(joinSymbol);
  } else if (rightDate.length) {
    datetime = rightDate.join(joinSymbol);
  }

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

  //check if an ongoing event
  let ongoing = false;
  let timeLeft = "";
  if (startDate && endDate) {
    let now = new Date();
    let sd = new Date(`${startDate} ${startTime}`);
    let ed = new Date(`${endDate} ${endTime}`);

    if (now.getTime() <= ed.getTime() && now.getTime() >= sd.getTime()) {
      ongoing = true;
      //calculate time until ending
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
