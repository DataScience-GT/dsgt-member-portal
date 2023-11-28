export const submitProjectApplication = async (
    projectId: number,
    preferredPhone: number,
    preferredEmail: string,
    linkedin: string,
    resume: string,
    technicalSkills: string,
    motivations: string,
    teamFit: string,
    availability: string,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
) => {
    await fetch('/api/projectApps/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify({
            projectId: projectId,
            preferredPhone: preferredPhone,
            preferredEmail: preferredEmail,
            linkedin: linkedin,
            resume: resume,
            technicalSkills: technicalSkills,
            motivations: motivations,
            teamFit: teamFit,
            availability: availability
        }),
    }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
            if (errorCallback) {
                errorCallback(json.error);
            } else {
                throw new Error(json.error);
            }
        } else if (successCallback) {
            successCallback();
        }
    })
}