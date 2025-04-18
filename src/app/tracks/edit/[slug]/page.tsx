'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getTrackById, updateTrack } from '@/lib/client/apiTracks';

import AppImage from "@/components/AppImage";
import TrackForm, { TrackFormData } from '@/components/forms/TrackForm';

export default function EditTrackPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trackData, setTrackData] = useState<TrackFormData | null>(null);

    console.log(slug, "slug")

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
            router.push(`/tracks/${updatedTrackData.data.slug}`);
        } catch (err) {
            console.error(err);
            setError('Failed to update track');
        } finally {
            setLoading(false);
        }
    };

    if (!trackData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center py-10 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative flex justify-center items-center">
                    <AppImage
                        alt="Track Cover"
                        width={500}
                        height={500}
                        src={trackData.coverImage}
                        className="w-80 h-80 object-cover rounded-full m-auto"
                    />
                </div>
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Edit Track</h1>
                    <TrackForm
                        onSubmit={onSubmit}
                        defaultValues={trackData}
                        loading={loading}
                        error={error}
                        buttonText="Update Track"
                    />
                </div>
            </div>
        </div>
    );
}
