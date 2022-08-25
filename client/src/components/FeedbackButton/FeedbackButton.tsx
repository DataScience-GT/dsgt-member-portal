import React, { FC, useState } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./FeedbackButton.module.scss";

import feedback_icon from "../../assets/icons/comments-question.svg";
import close_icon from "../../assets/icons/cross-small-skinny.svg";
import InlineRadioInput from "../InlineRadioInput/InlineRadioInput";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import { handleChange_textarea_string } from "../../Scripts/InputHandler";
import { createFeedback } from "../../API/Feedback";

interface FeedbackButtonProps {}

const FeedbackButton: FC<FeedbackButtonProps> = () => {
  const [screen, setScreen] = useState(1);

  const [satisfied, setSatisfied] = useState("");
  const [action, setAction] = useState("");
  const [urgency, setUrgency] = useState("");
  const [bugText, setBugText] = useState("");
  const [changeText, setChangeText] = useState("");
  const [featureText, setFeatureText] = useState("");

  const handleCloseMenu = () => {
    document.getElementById("feedback-menu-open")?.click();
  };

  const handleSubmit = async () => {
    //attempt to submit the feedback
    if (satisfied || (action && (bugText || featureText || changeText))) {
      let content = "";
      switch (action) {
        case "change":
          content = changeText;
          break;
        case "bug":
          content = bugText;
          break;
        case "feature":
          content = featureText;
          break;
        default:
          break;
      }
      await createFeedback(
        satisfied,
        action,
        parseInt(urgency),
        content,
        () => {
          closeMenu();
        }
      );
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    setSatisfied("");
    setAction("");
    setUrgency("");
    setBugText("");
    setFeatureText("");
    setChangeText("");

    setScreen(2);
    setTimeout(() => {
      handleCloseMenu();
      setScreen(1);
    }, 2000);
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
        {screen === 1 ? (
          <>
            <h1 className={styles.Major}>Feedback</h1>
            <h1 className={styles.Minor}>
              How satisfied are you with this membership portal?
            </h1>
            <FlexRow padding="0.5em 0" gap="0.5em">
              <InlineRadioInput
                name="satisfied"
                label="Very Satisfied"
                color="green"
                currentValue={satisfied}
                setValue={setSatisfied}
              />
              <InlineRadioInput
                name="satisfied"
                label="Satisfied"
                color="#B5D6A7"
                currentValue={satisfied}
                setValue={setSatisfied}
              />
              <InlineRadioInput
                name="satisfied"
                label="Neither Satisfied nor Unsatisfied"
                color="#aaa"
                currentValue={satisfied}
                setValue={setSatisfied}
              />
              <InlineRadioInput
                name="satisfied"
                label="Unsatisfied"
                color="#FD9800"
                currentValue={satisfied}
                setValue={setSatisfied}
              />
              <InlineRadioInput
                name="satisfied"
                label="Very Unsatisfied"
                color="red"
                currentValue={satisfied}
                setValue={setSatisfied}
              />
            </FlexRow>
            <h1 className={styles.Minor}>Would you like to:</h1>
            <FlexRow padding="0.5em 0" gap="0.5em">
              <InlineRadioInput
                name="action"
                label="Suggest a new feature"
                color="green"
                value="feature"
                currentValue={action}
                setValue={setAction}
              />
              <InlineRadioInput
                name="action"
                label="Suggest a change"
                color="#FD9800"
                value="change"
                currentValue={action}
                setValue={setAction}
              />
              <InlineRadioInput
                name="action"
                label="Report a bug"
                color="red"
                value="bug"
                currentValue={action}
                setValue={setAction}
              />
            </FlexRow>
            {action === "feature" ? (
              <>
                <h1 className={styles.Minor}>
                  Please describe the feature you would like in detail:
                </h1>
                <textarea
                  className={styles.TextInput}
                  onChange={(e) => {
                    handleChange_textarea_string(e, setFeatureText);
                  }}
                ></textarea>
              </>
            ) : (
              ""
            )}
            {action === "change" ? (
              <>
                <h1 className={styles.Minor}>
                  Please describe the change you would like:
                </h1>
                <textarea
                  className={styles.TextInput}
                  onChange={(e) => {
                    handleChange_textarea_string(e, setChangeText);
                  }}
                ></textarea>
              </>
            ) : (
              ""
            )}
            {action === "bug" ? (
              <>
                <h1 className={styles.Minor}>Urgency:</h1>
                <FlexRow padding="0.5em 0" gap="0.5em">
                  <InlineRadioInput
                    name="urgency"
                    label="High"
                    color="red"
                    value="3"
                    currentValue={urgency}
                    setValue={setUrgency}
                  />
                  <InlineRadioInput
                    name="urgency"
                    label="Medium"
                    color="#FD9800"
                    value="2"
                    currentValue={urgency}
                    setValue={setUrgency}
                  />
                  <InlineRadioInput
                    name="urgency"
                    label="Low"
                    color="#B5D6A7"
                    value="1"
                    currentValue={urgency}
                    setValue={setUrgency}
                  />
                </FlexRow>
                <h1 className={styles.Minor}>
                  Please describe where you found the bug and what it does:
                </h1>
                <textarea
                  className={styles.TextInput}
                  onChange={(e) => {
                    handleChange_textarea_string(e, setBugText);
                  }}
                ></textarea>
              </>
            ) : (
              ""
            )}
            <input
              className={styles.SubmitButton}
              type="submit"
              onClick={handleSubmit}
            />
          </>
        ) : (
          <FlexColumn
            width="100%"
            height="16em"
            spacing="center"
            align="center"
          >
            <h1 className={styles.Major} style={{ textAlign: "center" }}>
              Thank You!
            </h1>
          </FlexColumn>
        )}
      </div>
    </div>
  );
};

export default FeedbackButton;
