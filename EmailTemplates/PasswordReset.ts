export const getPasswordResetEmail = (recovery_link: string) => {
  return `<p>click the following link to reset your password:</p><a href='${recovery_link}'>${recovery_link}</a>`;
};
