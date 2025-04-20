import Filters from "@/components/traks/Filters";
import TrackItem from "@/components/traks/TrackItem";
import Pagination from "@/components/traks/Pagination";

import {FiltersProps, getTracks, Track} from "@/lib/client/apiTracks";
import Spinner from "@/components/widgets/Spinner";

/**
 *
 * @param searchParams
 * @constructor
 */
export default async function TracksPage(
    {searchParams}: {
        searchParams: FiltersProps;
    }
) {
    const filters = {
        page: searchParams.page ?? 1,
        genre: searchParams.genre ?? '',
        search: searchParams.search ?? '',
        artist: searchParams.artist ?? '',
        sortBy: searchParams.sortBy ?? 'createdAt',
        order: searchParams.order ?? 'desc',
        limit: searchParams.limit ?? 10
    };

    const {data} = await getTracks(filters);

    return (
        <div className="p-6">
            <h1
                data-testid="tracks-header"
                className="text-4xl font-bold mb-6 text-center text-gray-700"
            >
                Track List

            </h1>
            <Spinner/>
            <Filters filters={filters}/>

            {data.data.length === 0 ? (
                <p className="text-center text-gray-500 mt-10 text-lg flex items-center justify-center h-36">
                    <span>No result</span>
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {data.data.map((track: Track) => (
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