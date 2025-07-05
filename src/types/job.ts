export interface Company {
    name: string;
    title: string;
    slug: string;
}

export interface JobData {
    company: {
        name: string;
        department: string;
        street: string;
        plz: string;
        city: string;
        state: string;
        country?: string;
    };
    title: string;
    resume?: {
        education: Array<{
            degree: string;
            institution: string;
            period: string;
            description: string[];
        }>;
        experience: Array<{
            position: string;
            company: string;
            period: string;
            description: string[];
        }>;
        skills: {
            programmingLanguages: string;
            machineLearning: string;
            systemIntegration: string;
            projectLeadership: string;
        };
        languages: Array<{
            language: string;
            level: string;
            note?: string;
        }>;
    };
    motivation: {
        subject: string;
        content: {
            introduction: string;
            opening: string;
            motivation: string[];
            qualifications: string[];
            fit: string[];
            closing: string;
            signature: string;
        };
    };
} 