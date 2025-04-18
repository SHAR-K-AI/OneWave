import Link from 'next/link';
import {notFound} from 'next/navigation';

import {getTrackById} from '@/lib/client/apiTracks';
import {PencilIcon, ArrowLeftIcon} from '@heroicons/react/20/solid';

import AppImage from "@/components/AppImage";
import DeleteButton from "@/components/buttons/DeleteButton";

/**
 *
 * @param params
 * @constructor
 */
async function TrackPage({params}: { params: { slug: string } }) {
    try {
        const response = await getTrackById(params.slug);
        const track = response.data;

        if (!track) {
            notFound();
        }

        return (
            <div
                className="track-page bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto animate-fadeIn relative">
                <div className="absolute top-4 left-4 flex items-center space-x-4">
                    <Link
                        href="/tracks"
                        className="flex items-center space-x-2 p-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300"
                        aria-label="Back to Tracks"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        <span>Back to Tracks</span>
                    </Link>
                </div>
                <div className="absolute top-4 right-4 flex space-x-3">
                    <Link
                        aria-label="Edit"
                        href={`/tracks/edit/${params.slug}`} passHref
                        className="flex items-center space-x-2 p-2 bg-blue-600 rounded-full hover:bg-gray-400 transition duration-300"
                    >
                        <PencilIcon className="h-5 w-5"/>
                    </Link>
                    <DeleteButton id={track.id}/>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 animate-slideInFromTop">{track.title}</h1>
                    <p className="text-lg text-gray-600 mt-2 animate-slideInFromTop">{track.artist}</p>
                </div>

                <div className="mb-8 text-center">
                    <AppImage
                        width={500}
                        height={500}
                        src={track.coverImage}
                        alt={`${track.title} cover`}
                        className="w-80 h-80 object-cover rounded-full mx-auto shadow-lg transition-transform duration-500 transform hover:scale-105 animate-fadeIn cursor-pointer m-auto"
                    />
                </div>

                <div className="mb-6 text-center animate-slideInFromBottom">
                    <strong className="text-lg text-gray-800">Genres:</strong>
                    <p className="text-gray-600">{track.genres ? track.genres.join(', ') : 'N/A'}</p>
                </div>

                <div className="mb-6 text-center animate-slideInFromBottom">
                    <audio controls
                           className="w-full max-w-lg mx-auto bg-gray-100 rounded-lg transition-all duration-300 hover:bg-gray-200">
                        <source src={track.audioFile ? track.audioFile : "/api/audio/default"} type="audio/mp3"/>
                        Your browser does not support the audio element.
                    </audio>
                </div>

                {!track.audioFile && (
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-4">
                        <p>The track link is missing. A test link is being used instead.</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching track:', error);
        notFound();
    }
}

export default TrackPage;
