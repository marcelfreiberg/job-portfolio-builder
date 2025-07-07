import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Company } from '../types/job';

export default function Home() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/companies')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
                return response.json();
            })
            .then(async (companyNames: string[]) => {
                // Fetch each company's data to get the title
                const companiesData = await Promise.all(
                    companyNames.map(async (name) => {
                        try {
                            const response = await fetch(`/data/jobs/${name}.json`);
                            const data = await response.json();
                            return {
                                name: data.company.name,
                                title: data.title,
                                slug: name
                            };
                        } catch (err) {
                            console.error(`Failed to load ${name}:`, err);
                            return {
                                name: name.charAt(0).toUpperCase() + name.slice(1),
                                title: 'Application',
                                slug: name
                            };
                        }
                    })
                );
                setCompanies(companiesData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching companies:', err);
                setError(err.message);
                setLoading(false);
            });
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
                    {companies.map((company) => (
                        <div key={company.slug} className="bg-white rounded-lg shadow-md p-4">
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {company.name}
                                </h3>
                                <p className="text-gray-600">{company.title}</p>
                            </div>
                            
                            <div className="flex gap-4">
                                <Link 
                                    to={`/resume/${company.slug}`} 
                                    className="px-6 py-3 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition-colors"
                                >
                                    View Resume
                                </Link>
                                <Link 
                                    to={`/motivation/${company.slug}`} 
                                    className="px-6 py-3 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition-colors"
                                >
                                    View Motivation Letter
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}