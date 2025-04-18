'use client';

import classNames from "classnames";
import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '@/lib/store';
import {pause, play, setTrack} from '@/lib/store/slices/playerSlice';
import {PlayIcon, PauseIcon, XMarkIcon, EyeIcon, EyeSlashIcon} from '@heroicons/react/20/solid';

export default function AudioPlayer() {
    const dispatch = useDispatch();
    const {currentTrack, playing} = useSelector((state: RootState) => state.player);
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlayerVisible, setPlayerVisible] = useState(true);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [playing, currentTrack]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const audio = audioRef.current;
        if (!canvas || !audio) return;

        const context = new (window.AudioContext || (window as Window & {
            webkitAudioContext?: AudioContext
        }).webkitAudioContext)();
        const analyser = context.createAnalyser();
        const source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth * 0.8;
        canvas.height = 100;

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);

            const fbc_array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(fbc_array);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#1d4ed8';

            const barCount = Math.floor(canvas.width / 4);
            for (let i = 0; i < barCount; i++) {
                const barPos = i * 4;
                const barWidth = 2;
                const barHeight = -(fbc_array[i] / 2);
                ctx.fillRect(barPos, canvas.height, barWidth, barHeight);
            }
        };

        renderFrame();

        const handlePlay = () => {
            if (!context.state || context.state === 'suspended') {
                context.resume();
            }
        };

        audio.addEventListener('play', handlePlay);

        return () => {
            audio.removeEventListener('play', handlePlay);
            context.close();
        };
    }, [currentTrack]);

    if (!currentTrack) return null;

    return (
        <>
            <div
                className={classNames("fixed bottom-0 left-0 right-0 bg-white border-t z-50 opacity-85", {"invisible": !isPlayerVisible})}>
                <div
                    className={classNames("py-4 px-24 flex items-center justify-between", {"invisible": !isPlayerVisible})}>
                    <canvas ref={canvasRef} className="w-full h-24 bg-white p-5"/>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => dispatch(playing ? pause() : play())}
                            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
                        >
                            {playing ? (
                                <PauseIcon className="w-6 h-6 text-white"/>
                            ) : (
                                <PlayIcon className="w-6 h-6 text-white"/>
                            )}
                        </button>
                        <button
                            onClick={() => dispatch(setTrack(null))}
                            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
                        >
                            <XMarkIcon className="w-6 h-6 text-white"/>
                        </button>
                    </div>
                    <audio ref={audioRef} src={currentTrack}/>
                </div>
            </div>
            <button
                onClick={() => setPlayerVisible(!isPlayerVisible)}
                className="fixed z-50 bottom-20 left-10 transform -translate-x-1/2 px-2 py-2 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-600 transition"
            >
                {isPlayerVisible ? <EyeSlashIcon className="w-5 h-5 text-white"/>
                    : <EyeIcon className="w-5 h-5 text-white"/>
                }
            </button>
        </>
    );
}
