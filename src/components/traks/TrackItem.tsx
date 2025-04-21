import React from 'react';
import {Track} from "@/lib/client/apiTracks";

import {getAudioFileUrl} from "@/helpers/audio";
import {formatDate, generateTrackItemIds} from "@/helpers/track";

import TrackImage from "@/components/traks/TrackImage";
import TrackPlayer from "@/components/traks/TrackPlayer";
import EditTrackButton from "@/components/buttons/EditTrackButton";
import DanceTrackButton from "@/components/buttons/DanceTrackButton";
import ViewTrackButton from "@/components/buttons/ViewTrackButton";
import SelectTrackButton from "@/components/buttons/SelectTrackButton";
import DeleteTrackButton from "@/components/buttons/DeleteTrackButton";
import UploadTrackFileButton from "@/components/buttons/UploadTrackFileButton";

/**
 *
 * @param track
 * @constructor
 */
const TrackItem: React.FC<{ track: Track }> = ({track}) => {

    return (
        /*TODO data-testid="track-item-{id}" - Each track item container (where {id} is the track ID)*/
        <div
            key={track.id}
            data-testid={generateTrackItemIds(track.id)}
            className="group bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center relative transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <SelectTrackButton trackId={track.id}/>
            <TrackImage track={track}/>
            {/*TODO data-testid="track-item-{id}-title" - Track title text*/}
            <div
                className="text-gray-600 font-semibold text-xl mb-2 truncate w-full"
                data-testid={generateTrackItemIds(track.id, "title")}
            >
                {track.title}
            </div>
            {/*TODO data-testid="track-item-{id}-artist" - Track artist text*/}
            <div
                className="text-gray-600 mb-1 truncate w-full"
                data-testid={generateTrackItemIds(track.id, "artist")}
            >
                Artist: {track.artist}
            </div>
            <div className="text-gray-500 mb-1 truncate w-full">Album: {track.album}</div>
            <div className="text-gray-500 mb-1 truncate w-full">Genres: {track.genres.join(', ')}</div>
            <div className="text-gray-400 text-sm mb-4 truncate w-full">
                Updated At: {formatDate(track.updatedAt)}
            </div>
            <TrackPlayer
                track={track}
                src={track.audioFile ? getAudioFileUrl(track.audioFile) : "/api/audio/default"}
            />
            <div className="flex gap-2">
                <UploadTrackFileButton trackId={track.id} hasAudio={!!track.audioFile}/>
                <DanceTrackButton/>
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
