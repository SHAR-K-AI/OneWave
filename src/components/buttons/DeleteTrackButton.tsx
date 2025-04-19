'use client';

import classNames from "classnames";

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {TrashIcon} from '@heroicons/react/20/solid';

import {deleteTrack} from "@/lib/client/apiTracks";

/**
 *
 * @param trackId
 * @param className
 * @constructor
 */
const DeleteTrackButton = ({trackId, className}: { trackId: string, className: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTrack(trackId);
            router.push('/tracks');
        } catch (error) {
            console.error('Error deleting track:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            disabled={isDeleting}
            onClick={handleDelete}
            aria-label="Delete Track"
            className={classNames(className, "p-2 bg-red-600 text-white hover:bg-red-700 transition duration-300 cursor-pointer")}
        >
            <TrashIcon className="h-5 w-5"/>
        </button>
    );
};

export default DeleteTrackButton;