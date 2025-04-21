import React from 'react';
import {deleteTrackFile} from "@/lib/client/apiTracks";

interface DeleteFileButtonProps {
    trackId: string;
}

/**
 *
 * @param trackId
 * @constructor
 */
const DeleteFileButton: React.FC<DeleteFileButtonProps> = ({ trackId }) => {
    const handleDelete = async () => {
        try {
            await deleteTrackFile(trackId);
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Failed to delete file:', error);
            console.log('Failed to delete the file');
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors my-2"
        >
            Delete sound file
        </button>
    );
};

export default DeleteFileButton;
