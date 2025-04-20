'use client';

import {useState} from 'react';
import {createTrack, Track, uploadTrackFile} from '@/lib/client/apiTracks';

import classNames from "classnames";
import {useRouter} from 'next/navigation';

import AppImage from "@/components/AppImage";
import TrackForm from '@/components/forms/TrackForm';
import UploadButton from "@/components/buttons/UploadTrackFileButton";

interface CreateTrackFormContent {
    className?: string;
    onSuccess?: () => void;
    closeAfterSubmit?: boolean;
}

export default function CreateTrackFormContent({onSuccess, className, closeAfterSubmit}: CreateTrackFormContent) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    /**
     *
     * @param data
     */
    const onSubmit = async (data: Track) => {
        setLoading(true);
        setError(null);

        try {
            const newTrack = await createTrack(data);

            if (audioFile && newTrack.data.id) {
                await uploadAudio(newTrack.data.id, audioFile);
            }

            if (onSuccess) onSuccess();
            if (closeAfterSubmit) {
                router.refresh();
            } else {
                router.push('/tracks');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create track');
        } finally {
            setLoading(false);
        }
    };

    const uploadAudio = async (trackId: string, file: File) => {
        setUploading(true);
        try {
            await uploadTrackFile(trackId, file);
            console.log('Audio uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload audio file', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <TrackForm
            error={error}
            loading={loading}
            onSubmit={onSubmit}
            buttonText="Create Track"
        />
    );
}
