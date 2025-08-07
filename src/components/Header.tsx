import { PersonalData } from '../types/personal';
import profilePhoto from '../assets/profile-photo-square.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

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
                <div className={`flex-1 mt-2 mx-3`}>
                    <h1 className={`text-3xl text-white mb-1`}>{personal.name}</h1>
                    <h2 className={`text-lg text-gray-400 mb-1`}>{title}</h2>

                    <div className={`text-xs text-gray-400 space-y-1.5`}>
                        <div className="flex gap-5">
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>{personal.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faPhone} />
                                <span>{personal.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span>{personal.city}</span>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faLinkedin} />
                                <span>{personal.linkedin}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faGithub} />
                                <span>{personal.github}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faGlobe} />
                                <span>{personal.website}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}