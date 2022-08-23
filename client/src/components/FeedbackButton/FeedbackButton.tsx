import React, { FC, useState } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./FeedbackButton.module.scss";

import icon from "../../assets/icons/comments-question.svg";

interface FeedbackButtonProps {}

const FeedbackButton: FC<FeedbackButtonProps> = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
    setOpen(e.currentTarget.checked);
  };
  return (
    <div className={styles.FeedbackButton} data-testid="FeedbackButton">
      <input
        id="feedback-menu-open"
        className={styles.Checkbox}
        type={"checkbox"}
        onChange={handleOpen}
      />
      <label htmlFor="feedback-menu-open">
        <FlexRow
          spacing="center"
          align="center"
          height="100%"
          width="auto"
          wrap="nowrap"
          gap="1em"
        >
          <img className={styles.ButtonIcon} src={icon} alt="Feedback" />
          <div className={styles._openOnHover}>
            <p className={styles.ButtonText}>Feedback</p>
          </div>
        </FlexRow>
      </label>
    </div>
  );
};

export default FeedbackButton;
