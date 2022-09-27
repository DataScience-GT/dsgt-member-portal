export type Team = {
  team_id: number;
  name: string;
  description: string;
  members: string;
  member_list?: TeamMember[];
};

export type TeamMember = {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  gtemail: string;
};
