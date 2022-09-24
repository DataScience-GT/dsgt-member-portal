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
