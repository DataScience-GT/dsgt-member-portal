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

export type result_register = {
  ok: number;
  role: string;
  session_key: string;
};

// email
// fname
// lname
// password
// major
// minor
// gtemail
// personalEmail
// newMember
// studyYear
// gender
// ethnicity
// location
// experience
// interests
export const registerUser = async (
  email: string,
  fname: string,
  lname: string,
  password: string,
  major: string,
  minor: string,
  gtEmail: string,
  personalEmail: string,
  newMember: string,
  studyYear: string,
  gender: string,
  ethnicity: string,
  location: string,
  experience: string,
  interests: string[] | string,
  callback: (data: result_register) => void
) => {
  await fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      email: email,
      fname: fname,
      lname: lname,
      password: password,
      major: major,
      minor: minor,
      gtEmail: gtEmail,
      personalEmail: personalEmail,
      newMember: newMember,
      studyYear: studyYear,
      gender: gender,
      ethnicity: ethnicity,
      location: location,
      experience: experience,
      interests: interests,
    }),
  }).then(async (res) => {
    const json = await res.json();
    if (!json.ok && json.error) {
      throw new Error(json.error);
    } else {
      //return the resulting data
      callback(json);
    }
  });
};
