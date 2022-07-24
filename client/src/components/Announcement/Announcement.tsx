import React, { FC } from "react";
import styles from "./Announcement.module.scss";

interface AnnouncementProps {
  children?: React.ReactNode;
  when?: Date;
  from?: string;
  id?: number;
}

const Announcement: FC<AnnouncementProps> = ({
  children,
  when,
  from,
  id,
}: AnnouncementProps) => (
  <div
    className={styles.Announcement}
    data-testid="Announcement"
    data-announcement-id={id}
  >
    {when !== undefined ? (
      <h2 className={styles.Date}>
        {when.toLocaleDateString("en-us", {
          // weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        {from !== undefined ? ` by ` : ""}
        <span className={styles.From}>{from !== undefined ? from : ""}</span>
      </h2>
    ) : (
      ""
    )}
    <h1 className={styles.Title}>{children}</h1>
  </div>
);

//

export default Announcement;
