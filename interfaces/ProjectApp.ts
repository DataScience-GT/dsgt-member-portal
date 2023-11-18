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
    project_id: number;
    user_id: string;
    saq_response_1?: string;
    saq_response_2?: string;
    user_goals?: string;
}