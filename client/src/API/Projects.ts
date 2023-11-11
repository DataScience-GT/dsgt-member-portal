import { Role } from "../Scripts/RoleManagement";

export type result_getProjects = {
    pid: number;
    pname: string;
    plocation: string;
    relatedFields: string;
    pdescription: string;
    numStudents: string;
    termLength: string;
    compensationHour: number;
    startDate: string;
    desiredSkills: string;
    phosts: boolean;
    contactEmail: string;
};

export const getProjects = async (
    count?: number,
    callback?: (result: result_getProjects[]) => void
) => {
    let url = `/api/projects/get?session_id=${localStorage.getItem("dsgt-portal-session-key")}$`;
    if (count) {
        url += ``
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