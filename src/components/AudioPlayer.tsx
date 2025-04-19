'use client';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SharkDanceImage from "@/components/widgets/SharkDanceImage";

import { RootState } from '@/lib/store';
import { pause, play, setTrack } from '@/lib/store/slices/playerSlice';

import { PlayIcon, PauseIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

export default function AudioPlayer({ fixed = true }: { fixed?: boolean }) {
    const dispatch = useDispatch();
    const { currentTrack, playing } = useSelector((state: RootState) => state.player);

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

        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play();
        });

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
                    { "fixed bottom-0 left-0 right-0 z-50": fixed },
                    "bg-white w-full px-4 inset-shadow-sm inset-shadow-indigo-500/50",
                    { invisible: !isPlayerVisible }
                )}
            >
                <div className={classNames("py-4 px-4 md:px-8 lg:px-24 flex items-center justify-between max-w-full")}>
                    <div className="w-full h-24 bg-white relative">
                        <canvas ref={canvasRef} className="w-full h-24 bg-white px-4" />
                        <SharkDanceImage />
                    </div>

                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-1 md:space-x-4">
                        <button
                            onClick={() => dispatch(playing ? pause() : play())}
                            className="md:px-4 md:py-2 px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition sm:w-10 sm:h-10 md:w-12 md:h-12 flex justify-center items-center"
                        >
                            {playing ? <PauseIcon className="md:w-6 md:h-6 w-3 h-3" /> : <PlayIcon className="md:w-6 md:h-6 w-3 h-3" />}
                        </button>
                        <button
                            onClick={() => dispatch(setTrack(null))}
                            className="md:px-4 md:py-2 px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition sm:w-10 sm:h-10 md:w-12 md:h-12 flex justify-center items-center"
                        >
                            <XMarkIcon className="md:w-6 md:h-6 w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setPlayerVisible(!isPlayerVisible)}
                className="fixed bottom-20 left-5 z-50 px-2 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 sm:w-8 sm:h-8 md:w-10 md:h-10"
            >
                {isPlayerVisible ? <EyeSlashIcon className="w-5 h-5 sm:w-4 sm:h-4" /> : <EyeIcon className="w-5 h-5 sm:w-4 sm:h-4" />}
            </button>
        </>
    );
}
