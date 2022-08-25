export type result_getFeedback = {
  feedback_id: number;
  user_id?: number;
  satisfaction?: string;
  action?: FeedbackType;
  urgency?: number;
  content?: string;
  created_at: string;
  resolved: boolean;
  resolved_by?: number;
};

export enum FeedbackType {
  Bugs = "bug",
  Changes = "change",
  Features = "feature",
}

export const getFeedback = async (
  type: FeedbackType,
  count?: number,
  callback?: (result: result_getFeedback[]) => void
) => {
  let url = "/api/feedback/get";
  if (count) {
    url = `/api/feedback/get?count=${count}`;
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      feedback_type: type,
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      if (callback) callback(json.data);
    }
  });
};

export const createFeedback = async (
  satisfaction?: string,
  action?: string,
  urgency?: number,
  content?: string,
  callback?: () => void
) => {
  await fetch("/api/feedback/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      satisfaction: satisfaction,
      action: action,
      urgency: urgency,
      content: content,
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      if (callback) callback();
    }
  });
};
