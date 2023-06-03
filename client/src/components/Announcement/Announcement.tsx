import React, { FC } from "react";
import styles from "./Announcement.module.scss";

import trash_icon from "../../assets/icons/trash.svg";
import eye_icon2 from "../../assets/icons/eye_icon2.svg";
import FlexRow from "../../layout/FlexRow/FlexRow";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import InlineLink from "../InlineLink/InlineLink";
import { compareUserRoles } from "../../Scripts/RoleManagement";

interface AnnouncementProps {
  children?: React.ReactNode;
  when?: Date;
  from?: string;
  id?: number;
  deletable?: boolean;
  onDelete?: (announcement_id: number) => void;
  // Track which announcements were emails.
  link_url?: string;
  link_text?: string;
  view_count?: number;
  role?: string
}

const Announcement: FC<AnnouncementProps> = ({
  children,
  when,
  from,
  id,
  deletable,
  onDelete,
  link_url,
  link_text,
  view_count,
  role,
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
            {link_url && (
              <a
                href={link_url}
                target="_blank"
                rel="noreferrer"
                className={styles.AnnouncementButton}
              >
                {link_text || "Learn More"}
              </a>
            )}
          </div>
          <div className={styles.ViewCount}>
            <img className={styles.View} src={eye_icon2} alt="View Icon" />
          </div>
          <h1 className={styles.ViewNumber}>{view_count} views</h1>
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
        {compareUserRoles(role || "guest", "professor") >= 0 ? (
          <>
          <FlexRow align="center">

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
            {link_url && (
              <a
                href={link_url}
                target="_blank"
                rel="noreferrer"
                className={styles.AnnouncementButton}
              >
                {link_text || "Learn More"}
              </a>
            )}
          </div>

          <div className={styles.ViewCount}>
            <img className={styles.View} src={eye_icon2} alt="View Icon" />
          </div>
          <h1 className={styles.ViewNumber}>{view_count} views</h1>
        </FlexRow>
          </>
        ) : (
          <>
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
          {link_url && (
            <a
              href={link_url}
              target="_blank"
              rel="noreferrer"
              className={styles.AnnouncementButton}
            >
              {link_text || "Learn More"}
            </a>
          )}
          </>
        )}
      </div>
    );
  }
};

//

export default Announcement;
