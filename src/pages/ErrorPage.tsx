import { Link } from 'react-router';
import { useEffect } from 'react';
import personalData from '../data/personal.json';

type Props = { code?: number; message?: string };

export default function ErrorPage({
    code = 404,
    message = 'Page not found.',
}: Props) {
    useEffect(() => {
        document.title = `${personalData.personal.name} - Page Not Found`;
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
            <h1 className="text-6xl font-bold text-red-600 mb-4">{code}</h1>
            <p className="text-xl text-gray-700 mb-8">{message}</p>
            <Link to="/" className="px-6 py-3 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600" >
                Back to Home
            </Link>
        </div>
    );
}