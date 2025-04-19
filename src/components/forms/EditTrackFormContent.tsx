'use client';

import classNames from "classnames";

import {useDispatch} from "react-redux";
import {useEffect, useState} from 'react';

import {useRouter, useParams} from 'next/navigation';

import AppImage from "@/components/AppImage";
import UploadComponent from "@/components/buttons/UploadButton";
import TrackForm, {TrackFormData} from '@/components/forms/TrackForm';

import {updateSelectedTrack} from "@/lib/store/slices/tracksSlice";
import {getTrackById, updateTrack, uploadTrackFile} from '@/lib/client/apiTracks';

interface Props {
    onSuccess?: () => void;
    trackSlug?: string;
    className?: string;
    closeAfterSubmit?: boolean;
}

export default function EditTrackFormContent(
    {
        trackSlug,
        onSuccess,
        className,
        closeAfterSubmit,
    }: Props
) {
    const router = useRouter();
    const dispatch = useDispatch();

    const {slug = trackSlug}: { slug: string | undefined } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [trackData, setTrackData] = useState<TrackFormData | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [coverImage, setCoverImage] = useState<string>("");

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const response = await getTrackById(slug);
                const {genres, ...values} = response.data;
                const data: TrackFormData = {
                    genres: genres.map((genre: string) => ({id: genre, name: genre})),
                    ...values,
                };
                setTrackData(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load track');
            }
        };
        fetchTrack();
    }, [slug]);

    const onSubmit = async ({genres, ...values}: TrackFormData): Promise<void> => {
        setLoading(true);
        setError(null);

        const data = {
            genres: genres.map((genre) => genre.id),
            ...values,
        };

        try {
            console.log(trackSlug, 'trackSlugtrackSlugtrackSlug')

            const updatedTrackData = await updateTrack(trackData?.id as string, data);

            if (audioFile && updatedTrackData.data.id) {
                await uploadAudio(updatedTrackData.data.id, audioFile);
            }
            dispatch(updateSelectedTrack(updatedTrackData.data));

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
            console.error('Failed to upload audio file');
        } finally {
            setUploading(false);
        }
    };

    if (!trackData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className={
            classNames(className, "grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white overflow-hidden")
        }>
            <div className="relative flex flex-col justify-center items-center space-y-6">
                <AppImage
                    width={500}
                    height={500}
                    key={coverImage}
                    alt="Track Cover"
                    src={trackData.coverImage || coverImage}
                    className="w-80 h-80 object-cover rounded-full"
                />
                <div className="p-4 text-center">
                    <h1 className="text-xl font-bold mb-4">Upload Your Audio File</h1>
                    <UploadComponent onFileSelect={(file) => setAudioFile(file)}/>
                    {uploading && <p className="text-center text-blue-600">Uploading audio file...</p>}
                </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Edit Track</h1>
                <TrackForm
                    error={error}
                    loading={loading}
                    onSubmit={onSubmit}
                    buttonText="Update Track"
                    defaultValues={trackData}
                    setCoverImage={setCoverImage}
                />
            </div>
        </div>
    );
}
