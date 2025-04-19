'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getTrackById, updateTrack, uploadTrackFile} from '@/lib/client/apiTracks';

import AppImage from "@/components/AppImage";
import UploadComponent from "@/components/buttons/UploadButton";
import TrackForm, { TrackFormData } from '@/components/forms/TrackForm';

export default function EditTrackPage() {
    const router = useRouter();
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trackData, setTrackData] = useState<TrackFormData | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [coverImage, setCoverImage] = useState<string>("");

    useEffect(() => {
        const fetchTrack = async () => {
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

    const onSubmit = async (data: TrackFormData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTrackData = await updateTrack(trackData.id as string, data);
            console.log(updatedTrackData, "newTrack")
            if (audioFile && updatedTrackData.data.id) {
                await uploadAudio(updatedTrackData.data.id, audioFile);
            }
            router.push(`/tracks/${updatedTrackData.data.slug}`);
        } catch (err) {
            console.error(err);
            setError('Failed to update track');
        } finally {
            setLoading(false);
        }
    };

    const uploadAudio = async (id: string, file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('audio', file);

        try {
            await uploadTrackFile(id, file);
            console.error('Failed to upload audio file');
        } catch (error) {
            console.log('Audio uploaded successfully!');
        }

        setUploading(false);
    };

    if (!trackData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center py-10 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
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
        </div>
    );
}
