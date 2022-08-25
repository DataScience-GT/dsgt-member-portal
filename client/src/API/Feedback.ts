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
