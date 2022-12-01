import React, { FC } from "react";
import styles from "./Announcement.module.scss";

import trash_icon from "../../assets/icons/trash.svg";
import FlexRow from "../../layout/FlexRow/FlexRow";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";

interface AnnouncementProps {
  children?: React.ReactNode;
  when?: Date;
  from?: string;
  id?: number;
  deletable?: boolean;
  onDelete?: (announcement_id: number) => void;
  // Track which announcements were emails.
  sent_email?: boolean;
}

const Announcement: FC<AnnouncementProps> = ({
  children,
  when,
  from,
  id,
  deletable,
  onDelete,
    sent_email
}: AnnouncementProps) => {
  if (deletable) {
    return (
      <div
        className={styles.AnnouncementManage}
        data-testid="Announcement"
        data-announcement-id={id}
      >
        <FlexRow align="center">
          {deletable ? (
            <div
              className={styles.TrashContainer}
              onClick={() => {
                if (id && onDelete) {
                  onDelete(id);
                }
              }}
            >
              <img className={styles.Trash} src={trash_icon} alt="Trash Icon" />
            </div>
          ) : (
            ""
          )}

          <div className={styles.Content}>
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
                <span className={styles.From}>
                  {from !== undefined ? from : ""}
                </span>
              </h2>
            ) : (
              ""
            )}
            <h1 className={styles.Title}>{children}</h1>
          </div>
        </FlexRow>
      </div>
    );
  } else {
    return (
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
            <span className={styles.From}>
              {from !== undefined ? from : ""}
            </span>
          </h2>
        ) : (
          ""
        )}
        <h1 className={styles.Title}>{children}</h1>
      </div>
    );
  }
};

//

export default Announcement;
