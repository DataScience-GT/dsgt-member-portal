import React, { FC } from "react";
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
}: EventCardProps) => {
  let leftDate = [];
  if (startDate && startTime) {
    let d = new Date(`${startDate} ${startTime}`);
    leftDate.push(d.toLocaleDateString("en-us"));
    leftDate.push(
      d.toLocaleTimeString("en-us", {
        hour: "numeric",
        minute: "numeric",
      })
    );
  } else if (startDate) {
    let sd = new Date(startDate);
    leftDate.push(sd.toLocaleDateString("en-us"));
  }
  // } else if (startTime) {
  //   let st = new Date(startTime);
  //   leftDate.push(st.toLocaleTimeString("en-us"));
  // }
  let rightDate = [];
  if (endDate && endTime) {
    let d = new Date(`${endDate} ${endTime}`);
    rightDate.push(d.toLocaleDateString("en-us"));
    rightDate.push(
      d.toLocaleTimeString("en-us", {
        hour: "numeric",
        minute: "numeric",
      })
    );
  } else if (endDate) {
    let ed = new Date(endDate);
    rightDate.push(ed.toLocaleDateString("en-us"));
  }
  let datetime = "";

  if (leftDate.length && rightDate.length) {
    datetime = `${leftDate.join(" ")} - ${rightDate.join(" ")}`;
  } else if (leftDate.length) {
    datetime = leftDate.join(" ");
  } else if (rightDate.length) {
    datetime = rightDate.join(" ");
  }

  return (
    <div
      className={`${styles.EventCard} ${big ? styles.BigEventCard : ""} ${
        sticky ? styles.StickyEventCard : ""
      }`}
      data-testid="EventCard"
    >
      <div className={`${styles.Image} ${big ? styles.BigImage : ""}`}>
        <img src={imageSRC} alt={name} />
      </div>
      <div className={styles.Content}>
        <p className={styles.When}>{datetime}</p>
        <h1 className={styles.Major}>{name ? name : "Event Name"}</h1>
        <p className={styles.Description}>
          {shortDescription ? shortDescription : "Event Short Description"}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
