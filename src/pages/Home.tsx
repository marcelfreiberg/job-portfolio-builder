import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { JobData } from '../types/job';
import personalData from '../data/personal.json';

type CompanyWithSlug = JobData & { slug: string };

export default function Home() {
    const [companies, setCompanies] = useState<CompanyWithSlug[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.title = `${personalData.personal.name} - Portfolio`;
    }, []);

    useEffect(() => {
        fetch('/api/companies')
            .then(response => response.json())
            .then((companyNames: string[]) => 
                Promise.all(
                    companyNames
                        .filter(name => !name.startsWith('example_'))
                        .map(async (slug) => {
                            const response = await fetch(`/data/jobs/${slug}.json`);
                            const data: JobData = await response.json();
                            return { ...data, slug };
                        })
                )
            )
            .then(setCompanies)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-gray-600">Loading applications...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Marcel Freiberg
                    </h1>
                    <h2 className="text-xl text-gray-500">
                        Application Documents
                    </h2>
                </div>

                <div className="space-y-4">
                    {[...companies].reverse().map((company) => (
                        <div key={company.slug} className="bg-white rounded-lg shadow-md p-4">
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {company.company?.name || 'Unknown Company'}
                                </h3>
                                <p className="text-gray-600">{company.date} - {company.title}</p>
                            </div>
                            
                            <div className="flex gap-4">
                                {company.resume && (
                                <Link 
                                    to={`/resume/${company.slug}`} 
                                    className="px-6 py-3 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition-colors"
                                >
                                    View Resume
                                </Link>
                                )}
                                {company.motivation && (
                                <Link 
                                    to={`/motivation/${company.slug}`} 
                                    className="px-6 py-3 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition-colors"
                                >
                                    View Motivation Letter
                                </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}