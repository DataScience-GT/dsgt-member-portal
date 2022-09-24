type Team = {
  team_id: number;
  name: string;
  description: string;
  members: string;
  member_list?: TeamMember[];
};

type TeamMember = {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  gtemail: string;
};
