export interface Session {
  user_id?: number;
  session_id?: string;
  created_at?: Date;
}

export interface NewSession {
  user_id: number;
  session_id: string;
}
