'use client';

import classNames from 'classnames';
import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import SharkDanceImage from "@/components/widgets/SharkDanceImage";
import {RootState} from '@/lib/store';

import { EyeIcon, EyeSlashIcon} from '@heroicons/react/20/solid';

interface ExtendedWindow extends Window {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
}

/**
 *
 * @param fixed
 * @constructor
 */
export default function Equalizer({fixed = true}: { fixed?: boolean }) {
    const {currentTrackId, isPlaying} = useSelector((state: RootState) => state.player);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceMap = useRef<Map<HTMLAudioElement, MediaElementAudioSourceNode>>(new Map());
    const animationRef = useRef<number | null>(null);
    const [isPlayerVisible, setPlayerVisible] = useState(true);

    useEffect(() => {
        if (!currentTrackId) return;

        const AudioContextClass =
            (window as ExtendedWindow).AudioContext || (window as ExtendedWindow).webkitAudioContext;

        if (!audioCtxRef.current && AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
        }

        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const audioElement = document.getElementById(`audio-${currentTrackId}`) as HTMLAudioElement;
        if (!audioElement) return;

        let source: MediaElementAudioSourceNode;

        if (sourceMap.current.has(audioElement)) {
            source = sourceMap.current.get(audioElement)!;
        } else {
            try {
                source = ctx.createMediaElementSource(audioElement);
                sourceMap.current.set(audioElement, source);
            } catch (e) {
                console.warn("MediaElementSource:", e);
                return;
            }
        }

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

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            analyser.disconnect();
            audioElement.pause();
        };
    }, [currentTrackId]);

    if (!currentTrackId) return null;

    return (
        <>
            <div
                className={classNames(
                    {"fixed bottom-0 left-0 right-0 z-50": fixed},
                    "bg-white w-full px-4 inset-shadow-sm inset-shadow-indigo-500/50",
                    {invisible: !isPlayerVisible}
                )}
            >
                <div className="py-4 px-4 md:px-8 lg:px-24 flex items-center justify-between max-w-full">
                    <div className="w-full h-24 bg-white relative">
                        <canvas ref={canvasRef} className="w-full h-24 bg-white px-4"/>
                        {isPlaying && <SharkDanceImage/>}
                    </div>
                </div>
            </div>
            <button
                onClick={() => setPlayerVisible(!isPlayerVisible)}
                className="fixed bottom-20 left-5 z-50 px-2 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 w-9 h-9"
            >
                {isPlayerVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
            </button>
        </>
    );
}
