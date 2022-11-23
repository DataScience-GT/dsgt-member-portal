export const getAnnouncementEmailTemplate = (emailBody: string) => {
    return "<p>New announcement from the Data Science club at Georgia Tech!</p>"
            + emailBody
            + "<p>You are receiving this email because you selected OK after asked</p>"
            + "<p>for DSGT email communication consent. If you would like to stop receiving</p>"
            + "<p>these emails, reach out to John Ramberger at jramberger3@gatech.edu.</p>";
}