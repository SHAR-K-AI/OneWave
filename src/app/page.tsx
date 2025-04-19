'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { play, setTrack } from '@/lib/store/slices/playerSlice';

export default function Home() {
    const dispatch = useDispatch();

    const handlePlay = () => {
        dispatch(setTrack("/api/audio/default"));
        dispatch(play());
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white flex flex-col">
            <section className="flex flex-col items-center justify-center text-center py-24 px-4">
                <motion.h2
                    className="text-5xl font-extrabold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Break Through the Waves of Sound
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-300 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    AI-powered track player with smart filters, visualizations, and full control.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <button
                        onClick={handlePlay}
                        className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg transition"
                    >
                        Launch Player
                    </button>
                </motion.div>
            </section>

            <motion.section
                id="features"
                className="bg-[#1e1e1e] py-16 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-10">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                src: "/images/readme-2.png",
                                alt: "Visualizer",
                                title: "Visualizer",
                                desc: "Dynamic canvas audio visualization while tracks play."
                            },
                            {
                                src: "/images/readme-1.png",
                                alt: "Filter",
                                title: "Playlist Filtering",
                                desc: "Smart genre and keyword-based filtering."
                            },
                            {
                                src: "/images/readme-3.png",
                                alt: "Upload",
                                title: "Fast Upload",
                                desc: "Instantly upload and preview new tracks with full metadata support."
                            }
                        ].map(({ src, alt, title, desc }) => (
                            <motion.div key={title} className="bg-[#2a2a2a] p-6 rounded-lg" whileHover={{ scale: 1.05 }}>
                                <Image src={src} alt={alt} width={400} height={250} className="rounded mb-4" />
                                <h4 className="text-xl font-semibold mb-2 text-blue-400">{title}</h4>
                                <p className="text-gray-300">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="try"
                className="py-16 text-center bg-[#141414]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-3xl font-bold mb-4">Dive into OneWave</h3>
                <p className="text-gray-400 mb-8">Explore your sound library like never before.</p>
                <Link
                    href="/tracks"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
                >
                    View Tracks
                </Link>
                <div className="mt-8">
                    <Image
                        src="/images/readme-1.png"
                        alt="Library"
                        width={800}
                        height={400}
                        className="mx-auto rounded shadow-lg grayscale hover:grayscale grayscale-0 transition duration-1000 cursor-pointer ease-in-out"
                    />
                </div>
            </motion.section>
        </div>
    );
}