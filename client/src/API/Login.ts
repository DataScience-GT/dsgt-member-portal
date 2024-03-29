/**
 * This attempt login function takes in an email and password
 * and an optional redirect and callback.
 * @param email email of user
 * @param password password of user
 * @param redirect redirect param to reach page after session key invalid
 * @param callback callback var
 */
export const attemptLogin = async (
  email: string,
  password: string,
  redirect?: string,
  callback?: () => void
) => {
  await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      // Save session key to localstorage
      localStorage.setItem("dsgt-portal-session-key", json.session_key);
      if (redirect) {
        // Redirect to the page the user was trying to access
        window.location.href = redirect;
      } else {
        window.location.href = "/portal";
      }
      if (callback) callback();
    }
  });
};
