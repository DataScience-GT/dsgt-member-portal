export const checkBillingDetailsExists = async (email: string) => {
  await fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the billing data
      return json.data;
    }
  });
};
