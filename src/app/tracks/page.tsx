import Filters from "@/components/traks/Filters";
import TrackItem from "@/components/traks/TrackItem";
import Pagination from "@/components/traks/Pagination";

import {FiltersProps, getTracks, Track} from "@/lib/client/apiTracks";

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/**
 *
 * @param searchParams
 * @constructor
 */
export default async function TracksPage(
    {  searchParams }: Props
) {
    const params = await searchParams;

    const filters: FiltersProps = {
        page: params.page ? Number(params.page) : 1,
        genre: params.genre ?? '',
        search: params.search ?? '',
        artist: params.artist ?? '',
        sortBy: params.sortBy ?? 'createdAt',
        order: params.order ?? 'desc',
        limit: params.limit ? Number(params.limit) : 10,
    };

    const {data} = await getTracks(filters);
    const tracks: Track[] = data.data;

    return (
        <div className="p-6">
            {/*TODO data-testid="tracks-header" - Main page heading/title*/}
            <h1
                data-testid="tracks-header"
                className="text-4xl font-bold mb-6 text-center text-gray-700"
            >
                Track List
            </h1>

            <Filters filters={filters} tracks={tracks}/>

            {tracks.length === 0 ? (
                <p className="text-center text-gray-500 mt-10 text-lg flex items-center justify-center h-36">
                    <span>No result</span>
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {tracks.map((track: Track) => (
                        <TrackItem key={track.id} track={track}/>
                    ))}
                </div>
            )}

            <Pagination
                filters={filters}
                currentPage={data.meta.page}
                totalPages={data.meta.totalPages}
            />
        </div>
    );
}