'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function BackToTracksButton() {
    return (
        <Link
            href="/tracks"
            className="flex items-center space-x-2 p-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300"
            aria-label="Back to Tracks"
        >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Tracks</span>
        </Link>
    );
}
