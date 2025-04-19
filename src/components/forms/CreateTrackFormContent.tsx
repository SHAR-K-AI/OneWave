'use client';

import {useState} from 'react';
import {createTrack, uploadTrackFile} from '@/lib/client/apiTracks';

import AppImage from "@/components/AppImage";
import UploadComponent from "@/components/buttons/UploadButton";
import TrackForm, {TrackFormData} from '@/components/forms/TrackForm';
import {useRouter} from 'next/navigation';
import classNames from "classnames";

interface Props {
    className?: string;
    onSuccess?: () => void;
    closeAfterSubmit?: boolean;
}

export default function CreateTrackFormContent({onSuccess, className, closeAfterSubmit}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [coverImage, setCoverImage] = useState<string>("");

    const onSubmit = async ({genres, ...values}: TrackFormData) => {
        setLoading(true);
        setError(null);

        const data = {
            genres: genres.map((genre) => genre.id),
            ...values,
        };

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
            console.error('Failed to upload audio file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={classNames(className, "grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white overflow-hidden")}>
            <div className="relative flex flex-col justify-center items-center space-y-6">
                <AppImage
                    width={500}
                    height={500}
                    alt="Track Image"
                    key={coverImage}
                    src={coverImage}
                    className="w-80 h-80 object-cover rounded-full"
                />
                <div className="p-4 text-center">
                    <h1 className="text-xl font-bold mb-4">Upload Your Audio File</h1>
                    <UploadComponent onFileSelect={(file) => setAudioFile(file)}/>
                    {uploading && <p className="text-center text-blue-600">Uploading audio file...</p>}
                </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Create New Track</h1>
                <TrackForm
                    error={error}
                    loading={loading}
                    onSubmit={onSubmit}
                    buttonText="Create Track"
                    setCoverImage={setCoverImage}
                />
            </div>
        </div>
    );
}
