export interface PersonalData {
    personal: {
        name: string;
        email: string;
        phone: string;
        city: string;
        linkedin: string;
        github: string;
    };
    resume: {
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
        skills: Array<{
            title: string;
            description: string;
        }>;
        certifications: Array<string>;
        languages: Array<{
            language: string;
            level: string;
        }>;
    };
} 