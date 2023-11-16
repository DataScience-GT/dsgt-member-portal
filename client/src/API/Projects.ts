import { Role } from "../Scripts/RoleManagement";

export type result_projects = {
    project_inc: number;
    project_name: string;
    project_location: string;
    related_fields: string;
    project_description: string;
    num_students: string;
    term_length: string;
    compensation_hour: number;
    start_date: string;
    desired_skills: string;
    project_hosts: string;
    contact_email: string;
};

/*
 * NOTE: createProject function currently hosted on DSGT website
 * link to repo: https://github.com/DataScience-GT/dsgt-website-2024
 */

export const getProjects = async (
    count?: number,
    callback?: (result: result_projects[]) => void
) => {
    let url = `/api/projects/get?session_id=${localStorage.getItem("dsgt-portal-session-key")}`
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

export const deleteProject = async (
    project_id: number,
    callback?: () => void
) => {
    await fetch('/api/projects/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify({
            session_id: localStorage.getItem("dsgt-portal-session-key"),
            project_id: project_id
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

export const updateProject = async (
    project_id: number,
    field_to_update: string,
    updated_field: string,
    callback?: () => void
) => {
    await fetch('/api/projects/update', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify({
            session_id: localStorage.getItem("dsgt-portal-session-key"),
            project_id: project_id,
            field_to_update: field_to_update,
            updated_field: updated_field
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