import React, { FC } from "react";
import styles from "./EventCard.module.scss";

interface EventCardProps {
  title?: string;
  description?: string;
  desc?: string;
  when?: string;
  big?: boolean;
}

const EventCard: FC<EventCardProps> = ({
  title,
  description,
  desc,
  when,
  big,
}: EventCardProps) => (
  <div
    className={`${styles.EventCard} ${big ? styles.BigEventCard : ""}`}
    data-testid="EventCard"
  >
    <div className={styles.Image}></div>
    <div className={styles.Content}>
      <h1 className={styles.Major}>Heading</h1>
      <p className={styles.Description}>something something something</p>
    </div>
  </div>
);

export default EventCard;
