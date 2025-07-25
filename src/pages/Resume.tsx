import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import personalData from '../data/personal.json';
import { JobData } from '../types/job';
import { PersonalData } from '../types/personal';
import Header from '../components/Header';

export default function Resume() {
    const { company } = useParams<{ company: string }>();
    const [jobData, setJobData] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { personal, resume } = personalData as PersonalData;
    
    const translations = {
        de: {
            education: "Ausbildung",
            experience: "Berufserfahrung",
            personalDetails: "Persönliche Daten",
            skillsAndAbilities: "Kenntnisse und Fähigkeiten",
            languages: "Sprachen",
            birthDate: "Geburtsdatum",
            birthPlace: "Geburtsort",
            programming: "Programming",
            mlAi: "ML & AI",
            systemIntegration: "System Integration",
            projectLeadership: "Project Leadership"
        },
        en: {
            education: "Education",
            experience: "Professional Experience",
            personalDetails: "Personal Details",
            skillsAndAbilities: "Skills and Abilities",
            languages: "Languages",
            birthDate: "Date of Birth",
            birthPlace: "Place of Birth",
            programming: "Programming",
            mlAi: "ML & AI",
            systemIntegration: "System Integration",
            projectLeadership: "Project Leadership"
        }
    };
    
    useEffect(() => {
        if (!company) {
            setError('No company specified');
            setLoading(false);
            return;
        }

        fetch(`/data/jobs/${company}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${company} data`);
                }
                return response.json();
            })
            .then(data => {
                setJobData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading job data:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [company]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-gray-600">Loading resume...</div>
            </div>
        );
    }

    if (error || !jobData) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-red-600">Error: {error || 'Failed to load data'}</div>
            </div>
        );
    }

    const resumeData = jobData.resume || resume;
    const title = jobData.title;
    
    const currentLanguage = jobData.language || 'de';
    const t = translations[currentLanguage as keyof typeof translations] || translations.de;

    return (
        <>
            {/* Back to Navigation Button */}
            <div className="fixed top-4 left-4 z-50">
                <Link to="/" className="bg-[rgb(50,56,68)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200 no-print">
                    <i className="fas fa-arrow-left mr-2"></i>Back to Home
                </Link>
            </div>

            <div className="cv-container bg-white mx-auto shadow-md">
                <Header personal={personal} title={title} />

                {/* <!-- Main Content Split --> */}
                <div className="flex gap-4 px-6 py-4">
                    {/* <!-- Left Column --> */}
                    <div className="flex-1 pr-4 border-r border-gray-300">
                        {/* <!-- Education --> */}
                        <section className="mb-4 border-b border-gray-300 pb-1">
                            <h3 className="text-xl text-gray-800 mb-2">{t.education}</h3>

                            {resumeData.education.map((education, index) => (
                                <div key={`education-${index}`} className="mb-2">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h4 className="text-lg text-gray-800">{education.degree}</h4>
                                            <p className="text-gray-400 font-medium">{education.institution}</p>
                                        </div>
                                        <div className="text-right text-sm text-gray-600">
                                            <p>{education.period}</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside text-gray-700 text-sm leading-relaxed ml-4">
                                        {education.description.map((description, descIndex) => (
                                            <li key={`education-${index}-desc-${descIndex}`} className="pl-1 hyphens-auto">{description}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        {/* <!-- Experience --> */}
                        <section className="mb-4">
                            <h3 className="text-xl text-gray-800 mb-2">{t.experience}</h3>

                            {resumeData.experience.map((experience, index) => (
                                <div key={`experience-${index}`} className="mb-2">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h4 className="text-lg text-gray-800">{experience.position}</h4>
                                            <p className="text-gray-400 font-medium">{experience.company}</p>
                                        </div>
                                        <div className="text-right text-sm text-gray-600">
                                            <p>{experience.period}</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside text-gray-700 text-sm leading-relaxed ml-4">
                                        {experience.description.map((description, descIndex) => (
                                            <li key={`experience-${index}-desc-${descIndex}`} className="pl-1 hyphens-auto">{description}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* <!-- Right Column --> */}
                    <div className="w-40 pl-2">
                        {/* <!-- Personal Details --> */}
                        <section className="mb-4 border-b border-gray-300 pb-2">
                            <h3 className="text-xl text-gray-800 mb-2 pb-1">{t.personalDetails}</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-400 block text-xs">{t.birthDate}</span>
                                    <span className="text-gray-700 text-xs">{personal.birthDate}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-xs">{t.birthPlace}</span>
                                    <span className="text-gray-700 text-xs">{personal.birthPlace}</span>
                                </div>
                            </div>
                        </section>

                        {/* <!-- Technical Skills --> */}
                        <section className="mb-4 border-b border-gray-300 pb-2">
                            <h3 className="text-xl text-gray-800 mb-2 pb-1">{t.skillsAndAbilities}</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-400 font-medium block text-xs">{t.programming}:</span>
                                    <span className="text-gray-700 text-xs">{resumeData.skills.programmingLanguages}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-medium block text-xs">{t.mlAi}:</span>
                                    <span className="text-gray-700 text-xs">{resumeData.skills.machineLearning}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-medium block text-xs">{t.systemIntegration}:</span>
                                    <span className="text-gray-700 text-xs">{resumeData.skills.systemIntegration}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-medium block text-xs">{t.projectLeadership}:</span>
                                    <span className="text-gray-700 text-xs">{resumeData.skills.projectLeadership}</span>
                                </div>
                            </div>
                        </section>

                        {/* <!-- Languages --> */}
                        <section className="mb-4">
                            <h3 className="text-xl text-gray-800 mb-2 pb-1">{t.languages}</h3>
                            <div className="text-sm space-y-1">
                                {resumeData.languages.map((language, index) => (
                                    <div key={`language-${index}`}>
                                        <span className="text-gray-800 font-medium text-xs">{language.level} in {language.language}</span>
                                        {language.note && <span className="text-gray-700 text-xs block">{language.note}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}