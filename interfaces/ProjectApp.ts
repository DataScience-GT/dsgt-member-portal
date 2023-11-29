export interface ProjectInfo {
    name: string;
    location: string;
    hosts: string;
    contactEmail: string;
    relatedFields: string;
    relatedFieldOther: string;
    imgData?: string;
    description: string;
    numStudentsDesired: number;
    termLength: string;
    compensationHour: number;
    startDate: string;
    skillsDesired: string;
    skillDesiredOther: string;
}

export interface ProjectApp {
    projectId: number,
    user_id: number,
    preferredPhone: string,
    preferredEmail: string,
    linkedin: string,
    resume: string,
    technicalSkills: string,
    motivations: string,
    teamFit: string,
    availability: string,
}