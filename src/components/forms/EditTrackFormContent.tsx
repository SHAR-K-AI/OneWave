'use client';

import {useDispatch} from "react-redux";
import {useEffect, useState} from 'react';
import {useRouter, useParams} from 'next/navigation';

import TrackForm from '@/components/forms/TrackForm';
import {getTrackById, Track, updateTrack, uploadTrackFile} from '@/lib/client/apiTracks';

interface EditTrackFormContent {
    onSuccess?: () => void;
    trackSlug?: string;
    className?: string;
    closeAfterSubmit?: boolean;
}

/**
 *
 * @param trackSlug
 * @param onSuccess
 * @param closeAfterSubmit
 * @constructor
 */
export default function EditTrackFormContent(
    {
        trackSlug,
        onSuccess,
        closeAfterSubmit,
    }: EditTrackFormContent
) {
    const params = useParams();
    const router = useRouter();
    const slug = (params?.slug ?? trackSlug) as string | undefined;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [trackData, setTrackData] = useState<(Track & { id: string; slug: string }) | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTrack = async () => {
            if (!slug) {
                setError("Track slug is missing");
                return;
            }

            try {
                const response = await getTrackById(slug);
                setTrackData(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load track');
            }
        };

        fetchTrack();
    }, [slug]);

    const onSubmit = async (data: Track): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const updatedTrackData = await updateTrack(trackData?.id as string, data);

            if (audioFile && updatedTrackData.data.id) {
                await uploadAudio(updatedTrackData.data.id, audioFile);
            }

            if (onSuccess) onSuccess();

            if (closeAfterSubmit) {
                router.refresh();
            } else {
                router.push(`/tracks/${updatedTrackData.data.slug}`);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to update track');
        } finally {
            setLoading(false);
        }
    };

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

    if (!trackData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <TrackForm
            error={error}
            loading={loading}
            onSubmit={onSubmit}
            buttonText="Update Track"
            defaultValues={trackData}
        />
    );
}
