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
<<<<<<< HEAD
    project_id: number;
    user_id: string;
    short_answer_1?: string;
    short_answer_2?: string;
    long_answer?: string;
    phone_number?: number;
    email?: string;
=======
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
>>>>>>> 8a9ae8f737b5045e9b89813658f1f6b7f4675f6d
}