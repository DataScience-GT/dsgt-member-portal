export const getAnnouncementEmailTemplate = (emailBody: string) => {
  return `
    <p>New announcement from the Data Science club at Georgia Tech!<p>
    <div style="background: #eee; padding: 10px; border-radius: 10px;">${emailBody}</div>
    <p>You are receiving this email because you selected OK after asked for DSGT email communication consent. If you would like to stop receiving these emails, reach out to John Ramberger at john@datasciencegt.org.</p>
    `;
};
