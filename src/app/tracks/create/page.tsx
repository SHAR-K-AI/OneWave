'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTrack } from '@/lib/client/apiTracks';
import TrackForm, { TrackFormData } from '@/components/forms/TrackForm';
import Image from "next/image";

export default function CreateTrackPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: TrackFormData) => {
        setLoading(true);
        setError(null);
        try {
            await createTrack(data);
            router.push('/tracks');
        } catch (err) {
            console.error(err);
            setError('Failed to create track');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative flex justify-center items-center">
                    <Image
                        src="/images/default.jpeg"
                        alt="Track Image"
                        width={500}
                        height={500}
                        className="w-80 h-80 object-cover rounded-full m-auto"
                    />
                </div>
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Create New Track</h1>
                    <TrackForm
                        onSubmit={onSubmit}
                        loading={loading}
                        error={error}
                        buttonText="Create Track"
                    />
                </div>
            </div>
        </div>
    );
}
