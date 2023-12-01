export type ProjectApp = {
    app_id: number;
    project_id: number;
    preferred_email: string;
    linkedin: string;
    resume: string;
    technical_skills: string;
    motivations: string;
    team_fit: number;
    availability: string;
    submitted_at: string;
    status: string;
    status_change_timestamp: string;
    preferred_phone: string;
    user_id: number;
};

export const submitProjectApplication = async (
    projectId: number,
    preferredPhone: string,
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
            session_id: localStorage.getItem("dsgt-portal-session-key"),
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

export const getProjectApps = async (
    count?: number,
    callback?: (result: ProjectApp[]) => void
) => {
    let url = `/api/projectapps/get?session_id=${localStorage.getItem("dsgt-portal-session-key")}`
    if (count) {
        url += `&count=${count}`
    }
    await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
    }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
            throw new Error(json.error);
        } else {
            if (callback) {
                callback(json.data);
            }
        }
    });
};