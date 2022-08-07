export const getPasswordResetEmail = (recovery_link: string) => {
  return `<h1>click here to reset your password: ${recovery_link}</h1>`;
};
