"use client";

import {getAudioFileUrl} from '@/helpers/audio';
import React, {useState, useEffect} from 'react';
import {notFound, useParams} from 'next/navigation';
import {getTrackBySlug, Track} from '@/lib/client/apiTracks';

import AppImage from "@/components/widgets/AppImage";
import TrackPlayer from "@/components/traks/TrackPlayer";
import EditTrackButton from "@/components/buttons/EditTrackButton";
import DeleteTrackButton from "@/components/buttons/DeleteTrackButton";
import BackToTracksButton from "@/components/buttons/BackToTracksButton";

/**
 *
 * @constructor
 */
const TrackPage = () => {
    const {slug} = useParams<{ slug: string | undefined }>();
    const [track, setTrack] = useState<Track | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchTrack = async () => {
            try {
                const response = await getTrackBySlug(slug);
                const track: Track = response.data;

                if (!track) {
                    notFound();
                    return;
                }

                setTrack(track);
            } catch (error) {
                console.error('Error fetching track:', error);
                notFound();
            }
        };

        fetchTrack();
    }, [slug]);

    if (!track) {
        return null;
    }

    const slugValue = slug ?? '';

    return (
        <div className="track-page bg-white m-4 p-8 rounded-xl shadow-2xl max-w-4xl mx-auto animate-fadeIn relative">
            <div className="absolute top-4 left-4 flex items-center space-x-4">
                <BackToTracksButton/>
            </div>
            <div className="absolute top-4 right-4 flex space-x-3">
                <EditTrackButton trackId={track.id} slug={slugValue} openInModal={false} className="rounded-full"/>
                <DeleteTrackButton trackId={track.id} className="rounded-full"/>
            </div>

            <div className="text-center my-12">
                <h1 className="text-4xl font-extrabold text-gray-900 animate-slideInFromTop">{track.title}</h1>
                <h2 className="text-lg text-gray-600 mt-2 animate-slideInFromTop">{track.artist}</h2>
                <h3 className="text-lg text-gray-600 mt-2 animate-slideInFromTop">{track.album || 'Unknown Album'}</h3>
            </div>

            <div className="mb-8 text-center">
                <AppImage
                    width={500}
                    height={500}
                    alt={`${track.title} cover`}
                    src={track.coverImage || 'default.jpg'}
                    className="w-80 h-80 object-cover rounded-full mx-auto shadow-lg transition-transform duration-500 transform hover:scale-105 animate-fadeIn cursor-pointer m-auto"
                />
            </div>

            <div className="mb-6 text-center animate-slideInFromBottom">
                <strong className="text-lg text-gray-800">Genres:</strong>
                <p className="text-gray-600">{track.genres ? track.genres.join(', ') : 'N/A'}</p>
            </div>

            <div className="mb-6 text-center animate-slideInFromBottom">
                <TrackPlayer
                    track={track}
                    src={track.audioFile ? getAudioFileUrl(track.audioFile) : "/api/audio/default"}
                />
            </div>

            {!track.audioFile && (
                <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-4">
                    <p>The track link is missing. A test link is being used instead.</p>
                </div>
            )}
        </div>
    );
};

export default TrackPage;
