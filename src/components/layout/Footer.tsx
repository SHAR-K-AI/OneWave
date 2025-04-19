import Link from 'next/link';

import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid';

import {
    HomeIcon,
    GlobeAltIcon,
    MusicalNoteIcon,
    InformationCircleIcon,
    ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/20/solid';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 pt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10">
                <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-sm">
                        We are a platform for discovering and managing your favorite music. Enjoy the sound!
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2 hover:text-white">
                            <HomeIcon className="h-4 w-4" />
                            <Link href="/" className="hover:text-white">Home</Link>
                        </li>
                        <li className="flex items-center space-x-2 hover:text-white">
                            <MusicalNoteIcon className="h-4 w-4" />
                            <Link href="/tracks" className="hover:text-white">Tracks</Link>
                        </li>
                        <li className="flex items-center space-x-2 hover:text-white">
                            <InformationCircleIcon className="h-4 w-4" />
                            <Link href="/about" className="hover:text-white">About</Link>
                        </li>
                        <li className="flex items-center space-x-2 hover:text-white">
                            <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                            <Link href="/contact" className="hover:text-white">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span>support@example.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <PhoneIcon className="h-4 w-4" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPinIcon className="h-4 w-4" />
                            <span>Kyiv, Ukraine</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Socials</h3>
                    <p className="text-sm mb-3">Follow us around the web:</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white">
                            <GlobeAltIcon className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Shar(k)AI. Built with ❤️ by Vadym. 🌊 OneWave. All rights reserved.
            </div>
        </footer>
    );
}
