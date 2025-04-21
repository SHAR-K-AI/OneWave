"use client";

import React, {useRef, useState} from 'react';
import {deleteTrackFile, uploadTrackFile} from "@/lib/client/apiTracks";
import {ArrowUpOnSquareIcon, TrashIcon} from '@heroicons/react/20/solid';
import classNames from "classnames";
import {useRouter} from "next/navigation";

type UploadTrackFileButton = {
    trackId?: string;
    hasAudio?: boolean;
    onFileSelect?: (file: File) => void;
};

/**
 *
 * @param trackId
 * @param onFileSelect
 * @constructor
 */
const UploadTrackFileButton = ({trackId, hasAudio, onFileSelect}: UploadTrackFileButton) => {
    const router = useRouter();
    const [audioExists, setAudioExists] = useState(hasAudio);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    /**
     *
     * @param trackId
     * @param file
     */
    const uploadAudio = async (trackId: string, file: File): Promise<void> => {
        setUploading(true);
        const formData = new FormData();
        formData.append('audio', file);

        try {
            await uploadTrackFile(trackId, file);
            router.refresh();
            console.log('Audio uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload audio file', error);
        } finally {
            setUploading(false);
            setAudioExists(true);
        }
    };

    const deleteAudio = async () => {
        if (!trackId) return;
        setUploading(true);
        try {
            await deleteTrackFile(trackId);
            router.refresh();
        } catch (error) {
            console.error('Failed to delete audio file', error);
        } finally {
            setUploading(false);
            setAudioExists(false);
        }
    };

    /**
     *
     * @param e
     */
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (onFileSelect) {
                onFileSelect(file);
            } else {
                if (trackId)
                    await uploadAudio(trackId, file);
            }
        }
    };

    const handleButtonClick = () => {
        if (audioExists) {
            deleteAudio();
        } else {
            inputRef.current?.click();
        }
    };

    return (
        /* TODO data-testid="upload-track-{id}" - Upload button for a specific track (if applicable)*/
        <button
            type="button"
            disabled={uploading}
            data-loading={uploading ? "true" : "false"}
            aria-disabled={uploading}
            data-testid={`upload-track-${trackId}`}
            onClick={handleButtonClick}
            className={classNames(
                audioExists ? "bg-gray-600 hover:bg-gray-700 " : "bg-green-600 hover:bg-green-700 ",
                "px-4 py-2 text-white rounded shadow  transition transform hover:scale-105 cursor-pointer"
            )}
        >
            <input
                type="file"
                ref={inputRef}
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
            />
            {audioExists ? (
                <TrashIcon className="h-5 w-5"/>
            ) : (
                <ArrowUpOnSquareIcon className="h-5 w-5"/>
            )}
        </button>
    );
};

export default UploadTrackFileButton;
