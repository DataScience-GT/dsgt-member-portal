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
    user_id: number;
    short_answer_1?: string;
    short_answer_2?: string;
    long_answer?: string;
    phone_number: number;
    email: string;
}