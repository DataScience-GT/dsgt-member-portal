export interface User {
  user_inc?: number;
  email?: string;
  fname?: string;
  lname?: string;
  password?: string;
  enabled?: boolean;
  role?: string;
  created_at?: Date;
}

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

export interface RegisterUser {
  email: string;
  fname: string;
  lname: string;
  password: string;
  major: string;
  minor?: string;
  gtEmail: string;
  personalEmail?: string;
  newMember: boolean;
  studyYear: string;
  gender: string;
  ethnicity: string;
  location: string;
  experience: string;
  interests: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
