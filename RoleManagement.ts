/**
 * compares 2 user's roles to see who is above who
 * @param role1 {string}
 * @param role2 {string}
 * @returns 1 if role1>role2, 0 if role1=role2, -1 if role1<role2
 */
export const compareUserRoles = (role1: string, role2: string) => {
  let a = getRoleValue(role1);
  let b = getRoleValue(role2);
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

export const getRoleValue = (role: string) => {
  if (role) {
    role = role.toLowerCase();
  }
  switch (role) {
    case "guest":
      return 0;
    case "member":
      return 3;
    case "moderator" || "mod":
      return 6;
    case "administrator" || "admin":
      return 9;
    case "developer" || "dev":
      return 12;
    case "owner":
      return 999;
    default:
      return -1;
  }
};
