import React, { FC, useEffect, useState } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./FeedbackButton.module.scss";

import feedback_icon from "../../assets/icons/comments-question.svg";
import close_icon from "../../assets/icons/cross-small-skinny.svg";
import InlineRadioInput from "../InlineRadioInput/InlineRadioInput";

interface FeedbackButtonProps {}

const FeedbackButton: FC<FeedbackButtonProps> = () => {
  // const [open, setOpen] = useState(false);

  // const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.checked);
  //   setOpen(e.currentTarget.checked);
  // };

  const [action, setAction] = useState("");

  const handleCloseMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    document.getElementById("feedback-menu-open")?.click();
  };

  return (
    <div className={styles.FeedbackButton} data-testid="FeedbackButton">
      <input
        id="feedback-menu-open"
        className={styles.Checkbox}
        type={"checkbox"}
      />
      <label htmlFor="feedback-menu-open">
        <FlexRow
          spacing="center"
          align="center"
          height="100%"
          width="auto"
          wrap="nowrap"
        >
          <img
            className={styles.ButtonIcon}
            src={feedback_icon}
            alt="Feedback"
          />
          <div className={styles._openOnHover}>
            <p className={styles.ButtonText}>Feedback</p>
          </div>
        </FlexRow>
      </label>
      <div className={styles.FeedbackMenu}>
        <div className={styles.Head}>
          <img
            className={styles.CloseIcon}
            src={close_icon}
            alt="Close"
            onClick={handleCloseMenu}
          />
        </div>
        <h1 className={styles.Major}>Feedback</h1>
        <h1 className={styles.Minor}>Would you like to:</h1>
        <FlexRow padding="0.5em 0" gap="0.5em">
          <InlineRadioInput
            name="test"
            label="Suggest a new feature"
            color="green"
            value="feature"
            currentValue={action}
            setValue={setAction}
          />
          <InlineRadioInput
            name="test"
            label="Report a bug"
            color="red"
            value="bug"
            currentValue={action}
            setValue={setAction}
          />
        </FlexRow>
        {action === "feature" ? <p>a</p> : ""}
        {action === "bug" ? <p>b</p> : ""}
      </div>
    </div>
  );
};

export default FeedbackButton;
