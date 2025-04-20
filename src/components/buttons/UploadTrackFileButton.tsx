"use client";

import React, {useRef, useState} from 'react';
import {ArrowUpOnSquareIcon} from '@heroicons/react/20/solid';
import {uploadTrackFile} from "@/lib/client/apiTracks";

type UploadTrackFileButton = {
    trackId: string;
};

/**
 *
 * @param trackId
 * @param onFileSelect
 * @constructor
 */
const UploadTrackFileButton = ({trackId}: UploadTrackFileButton) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);

    const uploadAudio = async (trackId: string, file: File): Promise<void> => {
        setUploading(true);
        const formData = new FormData();
        formData.append('audio', file);

        try {
            await uploadTrackFile(trackId, file);
            console.log('Audio uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload audio file', error);
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            await uploadAudio(trackId, file);
        }
    };

    return (
        <button
            type="button"
            disabled={uploading}
            data-testid={`upload-track-${trackId}`}
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition transform hover:scale-105 cursor-pointer"
        >
            <input
                type="file"
                ref={inputRef}
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <ArrowUpOnSquareIcon className="h-5 w-5"/>
        </button>
    );
};

export default UploadTrackFileButton;
