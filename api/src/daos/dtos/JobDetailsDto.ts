export type JobDetailsDto = {
    id: number;
    title: string;
    company: string;
    workModel: string;
    salary: number | null;
    description: string;
    appliedAt: Date;
    createdAt: Date;
    isArchived: boolean;
    status: {
        id: number;
        name: string;
        order: number;
    };
    contacts: {
        id: number;
        name: string;
        role: string | null;
        linkedin: string | null;
        phone: string | null;
    }[];
    links: {
        id: number;
        title: string;
        url: string;
    }[];
    comments: {
        id: number;
        text: string;
        date: Date;
    }[];
    mandatorySkills: {
        id: number;
        name: string;
    }[];
    recommendedSkills: {
        id: number;
        name: string;
    }[];
}
