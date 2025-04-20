"use client";

import {useDispatch, useSelector} from 'react-redux';
import React, { useRef} from 'react';
import {PlayIcon, PauseIcon} from '@heroicons/react/20/solid';
import {Track} from '@/lib/client/apiTracks';
import {play, pause, setTrackId} from '@/lib/store/slices/playerSlice';
import classNames from "classnames";

interface TrackPlayerProps {
    track: Track;
    src: string;
}

const TrackPlayer: React.FC<TrackPlayerProps> = ({track, src}) => {
    const dispatch = useDispatch();
    const currentTrackId = useSelector((state: any) => state.player.currentTrackId);
    const isPlaying = useSelector((state: any) => state.player.isPlaying);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = () => {
        if (currentTrackId && currentTrackId !== track.id) {

            const previousAudio = document.getElementById(currentTrackId) as HTMLAudioElement;
            if (previousAudio) {
                dispatch(pause());
                previousAudio.pause();

            }
        }

        if (audioRef.current) {
            audioRef.current.play();
            console.log(track.id, "track.idtrack.id")
            dispatch(setTrackId(track.id)); // Оновити ID поточної пісні
            dispatch(play());

        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            dispatch(pause());
            audioRef.current.pause();
            console.log(currentTrackId === track.id, isPlaying, "track.idtrack.id")
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const progress = parseFloat(e.target.value);
            audioRef.current.currentTime = progress * audioRef.current.duration;
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const progress = audioRef.current.currentTime / audioRef.current.duration;
            const progressElement = document.querySelector(
                `[data-testid="audio-progress-${track.id}"]`
            ) as HTMLInputElement;
            if (progressElement) {
                progressElement.value = progress.toString();
            }
        }
    };

    return (
        <div data-testid={`audio-player-${track.id}`} className="audio-player p-4 w-full">
            <audio ref={audioRef} src={src} onTimeUpdate={updateProgress} id={`audio-${track.id.toString()}`}/>
            <div className="controls flex justify-around items-center text-gray-400">
                <button
                    className="text-gray-400"
                    data-testid={`play-button-${track.id}`}
                    onClick={handlePlay}
                >
                    <PlayIcon
                        className={classNames(
                            "w-6 h-6 cursor-pointer",
                            {"text-green-400": isPlaying && (currentTrackId === track.id)})}
                    />
                </button>
                <input
                    type="range"
                    data-testid={`audio-progress-${track.id}`}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={handleProgressChange}
                />
                <button
                    data-testid={`pause-button-${track.id}`}
                    onClick={handlePause}
                >
                    <PauseIcon
                        className={classNames("w-6 h-6 cursor-pointer", {"text-blue-400": !isPlaying && (currentTrackId === track.id)})}/>
                </button>
            </div>
        </div>
    );
};

export default TrackPlayer;
