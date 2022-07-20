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

export interface RegisterUser {
  email: string;
  fname: string;
  lname: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
