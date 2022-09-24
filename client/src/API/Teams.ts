export type result_getTeams = {
  team_id: number;
  name: string;
  description: string;
  members: string;
};

export const getTeams = async (
  callback?: (data: result_getTeams[]) => void
) => {
  await fetch(
    `/api/teams/list?session_id=${localStorage.getItem(
      "dsgt-portal-session-key"
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }
  ).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the data
      if (callback) callback(json.data);
    }
  });
};

export const getMyTeams = async (
  callback?: (data: result_getTeams[]) => void
) => {
  await fetch(
    `/api/teams/list/my?session_id=${localStorage.getItem(
      "dsgt-portal-session-key"
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }
  ).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the data
      if (callback) callback(json.data);
    }
  });
};

export type result_addMembersToTeam = {
  ok: number;
  not_added?: string[];
};

export const addMembersToTeam = async (
  team_id: number,
  emails: string[],
  callback?: (data: result_addMembersToTeam) => void
) => {
  await fetch(`/api/teams/${team_id}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      emails: emails.join(","),
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the data
      if (callback) callback(json);
    }
  });
};

export type result_getTeamData = {
  team_id: number;
  name: string;
  description: string;
  members: string;
  member_list: [
    {
      user_id: number;
      fname: string;
      lname: string;
      email: string;
      gtemail: string;
    }
  ];
};

export const getTeamData = async (
  team_id: number,
  callback?: (data: result_getTeamData) => void
) => {
  await fetch(
    `/api/teams/${team_id}?session_id=${localStorage.getItem(
      "dsgt-portal-session-key"
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }
  ).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the data
      if (callback) callback(json.data);
    }
  });
};

export const createTeam = async (
  team_name: string,
  team_description?: string,
  callback?: () => void
) => {
  await fetch(`/api/teams/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      name: team_name,
      description: team_description,
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the data
      if (callback) callback();
    }
  });
};
