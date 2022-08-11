export type result_getEvents = {
  event_id: 1;
  name: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  shortDescription: string;
  longDescription: string;
  link: string;
  enabled: boolean;
  created_at: string;
  startISO: string;
  endISO: string;
  imageData: string;
};

export enum EventListType {
  Upcoming,
  Ongoing,
  Continuous,
}
export const getEvents = async (
  count?: number,
  type?: EventListType | undefined | null,
  callback?: (result: result_getEvents[]) => void
) => {
  let url = "/api/event/get";
  if (count) {
    url = `/api/event/get?count=${count}`;
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      upcoming: type === EventListType.Upcoming,
      ongoing: type === EventListType.Ongoing,
      continuous: type === EventListType.Continuous,
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

export const createEvent = async (
  name: string,
  location: string,
  imageData: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  shortDescription: string,
  longDescription: string,
  link: string,
  callback?: () => void
) => {
  await fetch("/api/event/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      session_id: localStorage.getItem("dsgt-portal-session-key"),
      name: name,
      location: location,
      imageData: imageData,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      shortDescription: shortDescription,
      longDescription: longDescription,
      link: link,
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
