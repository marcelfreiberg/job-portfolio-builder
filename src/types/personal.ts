export interface PersonalData {
    personal: {
        name: string;
        email: string;
        phone: string;
        address: string;
        photo: string;
        birthDate: string;
        birthPlace: string;
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
} 