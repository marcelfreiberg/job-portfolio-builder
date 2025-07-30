import personalData from '../data/personal.json';

export interface JobData {
    language?: string;
    date: string;
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
    resume?: typeof personalData.resume;
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