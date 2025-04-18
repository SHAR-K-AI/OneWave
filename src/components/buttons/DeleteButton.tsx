'use client';

import {deleteTrack} from "@/lib/client/apiTracks";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon } from '@heroicons/react/20/solid';

const DeleteButton = ({ id }: { id: number }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTrack(id);
            router.push('/tracks');
        } catch (error) {
            console.error('Error deleting track:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 cursor-pointer"
            aria-label="Delete Track"
            disabled={isDeleting}
        >
            <TrashIcon className="h-5 w-5" />
        </button>
    );
};

export default DeleteButton;