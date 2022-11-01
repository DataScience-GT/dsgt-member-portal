export type result_getCheckinEvents = {
  event_id: number;
  name: string;
  created_at: string;
  created_by: number;
};

export const getCheckinEvents = async (
  callback?: (result: result_getCheckinEvents[]) => void
) => {
  let url = `/api/checkin/event/get?session_id=${localStorage.getItem(
    "dsgt-portal-session-key"
  )}`;
  await fetch(url, {
    method: "GET",
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

export const createCheckinEvent = async (
  name: string,
  callback?: () => void
) => {
  let url = "/api/checkin/event/create";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      name,
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

export const checkinUser = async (
  event_id: number,
  uuid: string,
  callback?: (message: string) => void
) => {
  let url = "/api/checkin/user";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      event_id,
      uuid,
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      if (callback) callback(json.message);
    }
  });
};

export type result_getCheckinUsers = {
  checkin_id: number;
  user_id: number;
  event_id: number;
  created_at: string;
  created_by: number;
};

export const getCheckinUsers = async (
  event_id?: number,
  callback?: (data: result_getCheckinUsers[]) => void
) => {
  let url = `/api/checkin/users/get?session_id=${localStorage.getItem(
    "dsgt-portal-session-key"
  )}${event_id ? `&event_id=${event_id}` : ""}`;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      if (callback) callback(json.data as result_getCheckinUsers[]);
    }
  });
};
