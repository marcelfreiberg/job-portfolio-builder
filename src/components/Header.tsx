import { PersonalData } from '../types/personal';
import profilePhoto from '../assets/profile-photo-square.jpg';

interface HeaderProps {
    personal: PersonalData['personal'];
    title: string;
}

export default function Header({ personal, title }: HeaderProps) {
    return (
        <header className="bg-[rgb(50,56,68)]">
            <div className={`flex items-start gap-4`}>
                <img
                    src={profilePhoto}
                    alt={personal.name}
                    className='w-32 h-32'
                />

                {/* <!-- Text Content --> */}
                <div className={`flex-1 mt-4 mx-3`}>
                    <h1 className={`text-3xl text-white mb-1`}>{personal.name}</h1>
                    <h2 className={`text-lg text-gray-400 mb-3`}>{title}</h2>

                    <div className={`flex flex-wrap gap-3 text-xs text-gray-400`}>
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
    );
} 