export interface ProjectAppInfo {
    projectName: string;
    projectLocation: string;
    projectHosts: string;
    projectContactEmail: string;
    relatedFields: string;
    relatedFieldOther: string;
    projectDescription: string;
    numStudentsDesired: number;
    termLength: string;
    compensationHour: number;
    startDate: string;
    skillsDesired: string;
    skillDesiredOther: string;
}

export interface UserProjectApp {
    project_id: number,
    user_id: string,
    saq_response_1?: string,
    saq_response_2?: string,
    user_goals?: string,

}

export const userProjectApps = async (
    project_id: number,
    user_id: string,
    saq_response_1: string,
    saq_response_2: string,
    user_goals: string,
    callback: () => void
) => {
    await fetch('api/projectApps/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify({
            session_id: localStorage.getItem("dsgt-portal-session-key"),
            project_id: project_id,
            user_id: user_id,
            saq_response_1: saq_response_1,
            saq_response_2: saq_response_2,
            user_goals: user_goals
        }),
    }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
            throw new Error(json.error);
        } else if (callback) {
            callback();
        }
    })
}