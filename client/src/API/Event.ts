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
    // if (!json.ok && json.error) {
    //   throw new Error(json.error);
    // } else {
    //   //save session key to localstorage
    //   localStorage.setItem("dsgt-portal-session-key", json.session_key);
    //   window.location.href = "/portal";
    //   if (callback) callback();
    // }
    console.log(json);
  });
};
