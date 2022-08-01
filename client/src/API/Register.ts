export const checkBillingDetailsExists = async (
  email: string,
  callback: (data: Object) => void
) => {
  await fetch("/api/billing/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({ email: email }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the billing data
      callback(json.data);
    }
  });
};
