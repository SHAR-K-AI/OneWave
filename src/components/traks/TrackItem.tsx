import React from 'react';
import {Track} from "@/lib/client/apiTracks";

import {formatDate, generateTrackItemIds} from "@/helpers/track";

import AppImage from "@/components/AppImage";
import EditTrackButton from "@/components/buttons/EditTrackButton";
import PlayTrackButton from "@/components/buttons/PlayTrackButton";
import ViewTrackButton from "@/components/buttons/ViewTrackButton";
import SelectTrackButton from "@/components/buttons/SelectTrackButton";
import DeleteTrackButton from "@/components/buttons/DeleteTrackButton";
import UploadTrackFileButton from "@/components/buttons/UploadTrackFileButton";
import TrackPlayer from "@/components/traks/TrackPlayer";
import {getAudioFileUrl} from "@/helpers/audio";

/**
 *
 * @param track
 * @constructor
 */
const TrackItem: React.FC<{ track: Track }> = ({track}) => {
    return (
        <div
            key={track.id}
            data-testid={generateTrackItemIds(track.id)}
            className="group bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center relative transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <SelectTrackButton trackId={track.id}/>
            <div className="mb-4 w-full relative">
                <AppImage
                    key={track.coverImage}
                    src={track.coverImage}
                    alt={track.title}
                    width={200}
                    height={200}
                    className="w-64 h-64 object-cover rounded-full m-auto transition-all duration-300 group-hover:shadow-lg group-hover:rotate-4"
                />
            </div>
            <div
                className="text-gray-600 font-semibold text-xl mb-2"
                data-testid={generateTrackItemIds(track.id, "title")}
            >
                {track.title}
            </div>
            <div
                className="text-gray-600 mb-1"
                data-testid={generateTrackItemIds(track.id, "artist")}
            >
                Artist: {track.artist}
            </div>
            <div className="text-gray-500 mb-1">Album: {track.album}</div>
            <div className="text-gray-500 mb-1">Genres: {track.genres.join(', ')}</div>
            <div className="text-gray-400 text-sm mb-4">
                Updated At: {formatDate(track.updatedAt)}
            </div>
            <TrackPlayer
                track={track}
                src={track.audioFile ? getAudioFileUrl(track.audioFile) : "/api/audio/default"}
            />
            <div className="flex gap-2">
                <UploadTrackFileButton trackId={track.id}/>
                <PlayTrackButton track={track}/>
                <ViewTrackButton slug={track.slug}/>
                <EditTrackButton
                    slug={track.slug}
                    trackId={track.id}
                    className="rounded px-4 transform hover:scale-105"
                />
                <DeleteTrackButton trackId={track.id} className="rounded px-4 transform hover:scale-105"/>
            </div>
        </div>
    );
};

export default TrackItem;
