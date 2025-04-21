'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import TrackForm from '@/components/forms/TrackForm';
import {createTrack, Track, uploadTrackFile} from '@/lib/client/apiTracks';

interface CreateTrackFormContent {
    onSuccess?: () => void;
    closeAfterSubmit?: boolean;
}

/**
 *
 * @param onSuccess
 * @param closeAfterSubmit
 * @constructor
 */
export default function CreateTrackFormContent({onSuccess, closeAfterSubmit}: CreateTrackFormContent) {
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

    /**
     *
     * @param trackId
     * @param file
     */
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
            uploading={uploading}
            buttonText="Create Track"
            setAudioFile={setAudioFile}
        />
    );
}
