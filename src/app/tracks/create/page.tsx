'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTrack, uploadTrackFile } from '@/lib/client/apiTracks';

import AppImage from "@/components/AppImage";
import UploadComponent from "@/components/buttons/UploadButton";
import TrackForm, { TrackFormData } from '@/components/forms/TrackForm';

export default function CreateTrackPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [coverImage, setCoverImage] = useState<string>("");

    const onSubmit = async (data: TrackFormData) => {
        setLoading(true);
        setError(null);

        try {
            const newTrack = await createTrack(data);
            console.log(newTrack, "newTrack");
            if (audioFile && newTrack.data.id) {
                await uploadAudio(newTrack.data.id, audioFile);
            }
            router.push('/tracks');
        } catch (err) {
            console.error(err);
            setError('Failed to create track');
        } finally {
            setLoading(false);
        }
    };

    /**
     *
     * @param id
     * @param file
     */
    const uploadAudio = async (id: string, file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('audio', file);

        try {
            await uploadTrackFile(id, file);
            console.log('Audio uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload audio file');
        }

        setUploading(false);
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div
                className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative flex flex-col justify-center items-center space-y-6">
                    {coverImage}
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
                        <UploadComponent onFileSelect={(file) => setAudioFile(file)} />
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
        </div>
    );
}
