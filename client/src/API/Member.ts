import { Role } from "../Scripts/RoleManagement";

export const changeMemberRole = async (
  user_email: string,
  new_role: Role | string,
  callback?: () => void
) => {
  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      user_email: user_email,
      user_role: new_role,
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

export type result_getMembers = {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  enabled: boolean;
};

export const getMembers = async (
  callback?: (data: result_getMembers[]) => void
) => {
  await fetch("/api/user/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      if (callback) callback(json.data as result_getMembers[]);
    }
  });
};

export const changeMemberEnableDisable = async (
  user_email: string,
  user_enabled: boolean,
  callback?: () => void
) => {
  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      user_email: user_email,
      user_enabled: user_enabled,
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
      //   console.log(json.error);
    } else {
      //user successfully enabled/disabled
      if (callback) callback();
    }
  });
};
