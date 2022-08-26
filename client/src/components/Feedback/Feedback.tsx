import React, { FC } from "react";
import { FeedbackType } from "../../API/Feedback";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./Feedback.module.scss";

interface FeedbackProps {
  id?: number;
  type?: FeedbackType;
  urgency?: number;
  content?: string;
}

const Feedback: FC<FeedbackProps> = ({
  id,
  type,
  urgency,
  content,
}: FeedbackProps) => (
  <div className={styles.Feedback} data-testid="Feedback">
    <FlexRow>
      <div className={`${styles.Type} ${styles[`Type${type?.toUpperCase()}`]}`}>
        <div>{type}</div>
      </div>
      <FlexColumn padding="0.5em">
        <FlexRow>
          {/* tags */}
          {urgency && urgency > 0 ? <div className={`${styles.Urgency}`}>{}</div> : ""}
        </FlexRow>
        <p>{content}</p>
      </FlexColumn>
    </FlexRow>
  </div>
);

export default Feedback;
