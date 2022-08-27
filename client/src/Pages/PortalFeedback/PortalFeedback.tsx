import React, { FC, useEffect, useState } from "react";
import {
  FeedbackType,
  getFeedback,
  result_getFeedback,
} from "../../API/Feedback";
import ErrorText from "../../components/ErrorText/ErrorText";
import Feedback from "../../components/Feedback/Feedback";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalFeedback.module.scss";

interface PortalFeedbackProps {}

const PortalFeedback: FC<PortalFeedbackProps> = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    FeedbackType.Bugs
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<result_getFeedback[]>([]);

  useEffect(() => {
    //get feedback
    getFeedback(feedbackType, undefined, (data) => {
      setFeedback(data);
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [feedbackType]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newValue = e.currentTarget.value;
    if (!newValue) {
      return;
    }
    setFeedbackType(newValue as FeedbackType);
    setLoading(true);
  };

  return (
    <div className={styles.PortalFeedback} data-testid="PortalFeedback">
      <h1 className={styles.Major}>Feedback</h1>
      <h2 className={styles.Minor}>Select Type:</h2>
      <InputDropdown
        options={Object.keys(FeedbackType)}
        values={Object.values(FeedbackType)}
        initialValue={feedbackType.toString()}
        onChange={handleTypeChange}
      />
      <ErrorText>{error}</ErrorText>
      {loading ? (
        <p>loading...</p>
      ) : (
        <FlexRow gap="1em" padding="1em 0 0 0">
          {feedback.map((f) => (
            <Feedback
              key={f.feedback_id}
              id={f.feedback_id}
              type={f.action}
              content={f.content}
            />
          ))}
        </FlexRow>
      )}
    </div>
  );
};

export default PortalFeedback;
