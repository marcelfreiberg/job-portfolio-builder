import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import personalData from '../data/personal.json';
import { JobData } from '../types/job';
import { PersonalData } from '../types/personal';
import profilePhoto from '../assets/SKP_0981-quadrat.jpg';

export default function Motivation() {
    const { company } = useParams<{ company: string }>();
    const [jobData, setJobData] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { personal } = personalData as PersonalData;

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
                <div className="text-xl text-gray-600">Loading motivation letter...</div>
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

    const { company: companyData, title, motivation } = jobData;
    
    if (!motivation) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-red-600">Error: No motivation data available for this company</div>
            </div>
        );
    }

    return (
        <>
            {/* Back to Navigation Button */}
            <div className="fixed top-4 left-4 z-50">
                <Link to="/" className="bg-[rgb(50,56,68)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200 no-print">
                    <i className="fas fa-arrow-left mr-2"></i>Back to Home
                </Link>
            </div>

            <div className="cv-container">
                {/* <!-- Header Section --> */}
                <header className="bg-[rgb(50,56,68)]">
                    <div className="flex items-start gap-6">
                        <img src={profilePhoto} alt={personal.name} className="w-40 h-40" />

                        {/* <!-- Text Content --> */}
                        <div className="flex-1 mt-6 mx-4">
                            <h1 className="text-3xl text-white mb-2">{personal.name}</h1>
                            <h2 className="text-lg text-gray-400 mb-4">{title}</h2>

                            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <i className="fas fa-envelope"></i>
                                    <span>{personal.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <i className="fas fa-phone"></i>
                                    <span>{personal.phone}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{personal.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* <!-- Main Content --> */}
                <div className="p-8">
                    {/* <!-- Date and Recipient --> */}
                    <div className="mb-6">

                        <div className="text-sm text-gray-600 mb-4">
                            <p>{companyData.name}</p>
                            <p>{companyData.plz} {companyData.city}</p>
                            <p>{companyData.state}</p>
                            <p>{companyData.street}</p>
                            {companyData.country && <p>{companyData.country}</p>}
                        </div>

                        <div className="text-sm text-gray-600 mb-4 text-right">
                            <p>{new Date().toLocaleDateString('de-DE', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>

                        <div className="text-sm text-gray-600 mb-6">
                            <p><strong>{motivation.subject}</strong></p>
                        </div>
                    </div>

                    {/* <!-- Letter Content --> */}
                    <div className="text-gray-700 leading-tight space-y-4">
                        <p className='hyphens-auto'>{motivation.content.introduction}</p>

                        <p className='hyphens-auto'>{motivation.content.opening}</p>

                        {motivation.content.motivation && (
                            <div className="space-y-3">
                                {motivation.content.motivation.map((motivationText: string, index: number) => (
                                    <p key={`motivation-${index}`} className='hyphens-auto'>{motivationText}</p>
                                ))}
                            </div>
                        )}

                        {motivation.content.qualifications && (
                            <div className="space-y-3">
                                {motivation.content.qualifications.map((qualification: string, index: number) => (
                                    <p key={`qualification-${index}`} className='hyphens-auto'>{qualification}</p>
                                ))}
                            </div>
                        )}

                        {motivation.content.fit && (
                            <div className="space-y-3">
                                {motivation.content.fit.map((fit: string, index: number) => (
                                    <p key={`fit-${index}`} className='hyphens-auto'>{fit}</p>
                                ))}
                            </div>
                        )}

                        <p className='hyphens-auto'>{motivation.content.closing}</p>

                        <div className="mt-8">
                            <p>{motivation.content.signature}</p>
                            <p className="mt-4">{personal.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}