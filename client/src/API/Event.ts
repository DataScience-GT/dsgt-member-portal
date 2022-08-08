export const createEvent = async (imageData: string, callback?: () => void) => {
  await fetch("/api/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({ img: imageData }),
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
