/**
 * compares 2 user's roles to see who is above who
 * @param role1 {string}
 * @param role2 {string}
 * @returns 1 if role1>role2, 0 if role1=role2, -1 if role1<role2
 */
 export const compareUserRoles = (role1: string, role2: string) => {
  let a = getRoleValue(role1 as Role);
  let b = getRoleValue(role2 as Role);
  if (a > b) {
    //role1 > role2
    return 1;
  } else if (a == b) {
    //equal
    return 0;
  } else {
    //role2 > role1
    return -1;
  }
};

/**
 * Gets the value of a user's role
 * @param role {Role} user's role
 * @returns number
 */
export const getRoleValue = (role: Role): number => {
  let roleValue = RoleValueMap.get(role);
  return roleValue ?? 0;
};

export enum Role {
  Guest = "guest",
  Member = "member",
  Professor = "professor",
  Moderator = "moderator",
  Administrator = "administrator",
  JrDeveloper = "jr. developer",
  Developer = "developer",
  SrDeveloper = "sr. developer",
  Owner = "owner",
}

/**
 * Converts the user's role into its value
 */
export const RoleValueMap = new Map([
  [Role.Guest, 0],
  [Role.Member, 3],
  [Role.Professor, 4],
  [Role.Moderator, 6],
  [Role.Administrator, 9],
  [Role.JrDeveloper, 600],
  [Role.Developer, 700],
  [Role.SrDeveloper, 800],
  [Role.Owner, 999],
]);
