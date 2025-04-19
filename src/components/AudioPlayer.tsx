'use client';

import classNames from 'classnames';
import {RootState} from '@/lib/store';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {pause, play, setTrack} from '@/lib/store/slices/playerSlice';
import {PlayIcon, PauseIcon, XMarkIcon, EyeIcon, EyeSlashIcon} from '@heroicons/react/20/solid';

export default function AudioPlayer({fixed = true}: { fixed?: boolean }) {
    const dispatch = useDispatch();
    const {currentTrack, playing} = useSelector((state: RootState) => state.player);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const animationRef = useRef<number | null>(null);
    const [isPlayerVisible, setPlayerVisible] = useState(true);

    useEffect(() => {
        if (!currentTrack) return;

        const audio = new Audio(currentTrack);
        setAudioEl(audio);

        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;

        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;

        source.connect(analyser);
        analyser.connect(ctx.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const canvasCtx = canvas?.getContext('2d');
        if (!canvas || !canvasCtx) return;

        canvas.width = window.innerWidth * 0.8;
        canvas.height = 100;

        // Draw animated frequency bars
        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            canvasCtx.fillStyle = '#1d4ed8';

            const gap = 5;
            const barWidth = Math.max((canvas.width - gap * bufferLength) / bufferLength, 1);
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + gap;
            }
        };

        draw();

        if (playing) {
            audio.play();
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            source.disconnect();
            analyser.disconnect();
            audio.pause();
        };
    }, [currentTrack]);

    useEffect(() => {
        if (!audioEl) return;
        playing ? audioEl.play() : audioEl.pause();
    }, [playing, audioEl]);

    if (!currentTrack) return null;

    return (
        <>
            <div
                className={classNames(
                    {"fixed bottom-0 left-0 right-0 z-50": fixed},
                    "bg-white",
                    {invisible: !isPlayerVisible}
                )}
            >
                <div className={classNames({"px-24": fixed}, "py-4 px-24 flex items-center justify-between")}>
                    <canvas ref={canvasRef} className="w-full h-24 bg-white"/>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => dispatch(playing ? pause() : play())}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {playing ? <PauseIcon className="w-6 h-6"/> : <PlayIcon className="w-6 h-6"/>}
                        </button>
                        <button
                            onClick={() => dispatch(setTrack(null))}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            <XMarkIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setPlayerVisible(!isPlayerVisible)}
                className="fixed bottom-20 left-5 z-50 px-2 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
            >
                {isPlayerVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
            </button>
        </>
    );
}
