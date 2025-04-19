'use client';

import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/solid';

type EditTrackButtonProps = {
    slug: string;
};

export default function EditTrackButton({ slug }: EditTrackButtonProps) {
    return (
        <Link
            aria-label="Edit"
            href={`/tracks/edit/${slug}`}
            passHref
            className="flex items-center justify-center p-2 bg-blue-600 rounded-full hover:bg-gray-400 transition duration-300"
        >
            <PencilIcon className="h-5 w-5 text-white" />
        </Link>
    );
}
