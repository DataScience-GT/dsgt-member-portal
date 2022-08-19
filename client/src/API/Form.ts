export const createForm = async (
  name: string,
  link: string,
  time?: string,
  callback?: () => void
) => {
  await fetch("/api/form/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      name: name,
      time: time,
      url: link,
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

export type result_getForms = {
  name: string;
  url: string;
  time?: string;
  form_id: number;
  created_at: string;
  enabled: boolean;
};

export const getForms = async (
  count?: number,
  callback?: (result: result_getForms[]) => void
) => {
  let url = "/api/form/get";
  if (count) {
    url = `/api/event/get?count=${count}`;
  }
  await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      if (callback) callback(json.data);
    }
  });
};
