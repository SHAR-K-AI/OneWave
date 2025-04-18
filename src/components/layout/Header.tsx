import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <div className="relative">
            <header
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md z-10 relative">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight animate-spin-slow text-customColor">
                        <Link href="/">
                            🌊 OneWave
                        </Link>
                    </h1>
                    <nav className="space-x-4">
                        <Link href="/tracks">
                            Tracks
                        </Link>
                        <Link href="/tracks/create">
                            Create
                        </Link>
                        <Link href="/about">
                            About
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;
