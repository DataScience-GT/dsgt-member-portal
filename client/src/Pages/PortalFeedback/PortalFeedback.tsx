import React, { FC, useEffect, useState } from "react";
import {
  FeedbackType,
  getFeedback,
  result_getFeedback,
} from "../../API/Feedback";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
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
      console.log(data);
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
        initialValue={feedbackType}
        onChange={handleTypeChange}
      />
      <ErrorText>{error}</ErrorText>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {feedback.map((f) => (
            <p key={f.feedback_id}>{f.action}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalFeedback;
