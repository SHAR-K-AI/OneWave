'use client';

import {useForm} from 'react-hook-form';
import {getGenres} from "@/lib/client/apiGenres";

import FormControl from '@/components/forms/FormControl';

export type TrackFormData = {
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage: string;
};

type Props = {
    onSubmit: (data: TrackFormData) => Promise<void>;
    defaultValues?: Partial<TrackFormData>;
    loading?: boolean;
    error?: string | null;
    buttonText?: string;
    setCoverImage: (url: string) => void;
};

/**
 *
 * @param onSubmit
 * @param defaultValues
 * @param loading
 * @param error
 * @param buttonText
 * @param setCoverImage
 * @constructor
 */
export default function TrackForm(
    {
        onSubmit,
        defaultValues = {},
        loading = false,
        error,
        buttonText = "Submit",
        setCoverImage,
    }: Props
) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<TrackFormData>({
        defaultValues: {
            title: defaultValues.title || '',
            artist: defaultValues.artist || '',
            album: defaultValues.album || '',
            genres: defaultValues.genres || [],
            coverImage: defaultValues.coverImage || '',
        },
    });

    console.log(defaultValues.genres, "defaultValues.genres")

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoverImage(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormControl
                name="title"
                label="Title"
                errors={errors}
                required
                control={control}
                controlType="input"
                placeholder="Enter track title"
                groupClassName="space-y-1"
                controlFieldClassName="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                labelClassName="text-sm font-medium text-gray-700"
                controlClassName="w-full text-gray-700"
            />
            <FormControl
                name="artist"
                label="Artist"
                errors={errors}
                required
                control={control}
                controlType="input"
                placeholder="Enter artist name"
                groupClassName="space-y-1"
                controlFieldClassName="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                labelClassName="text-sm font-medium text-gray-700"
                controlClassName="w-full text-gray-700"
            />
            <FormControl
                name="album"
                label="Album"
                errors={errors}
                control={control}
                controlType="input"
                placeholder="Enter album name"
                groupClassName="space-y-1"
                controlFieldClassName="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                labelClassName="text-sm font-medium text-gray-700"
                controlClassName="w-full text-gray-700"
            />
            <FormControl
                name="genres"
                errors={errors}
                control={control}
                client={getGenres}
                isMultiple={true}
                isSearchable={false}
                controlType="async-select"
                placeholder="e.g. rock, pop"
                label="Genres"
                labelClassName="text-sm font-medium text-gray-700"
                getData={(data: string[]) => {
                    return data.map((item: string) => ({
                        id: item,
                        name: item,
                    }));
                }}
            />
            <FormControl
                name="coverImage"
                label="Cover Image"
                errors={errors}
                control={control}
                controlType="input"
                groupClassName="space-y-1"
                onChange={handleCoverImageChange}
                placeholder="Enter cover image URL"
                controlClassName="w-full text-gray-700"
                labelClassName="text-sm font-medium text-gray-700"
                controlFieldClassName="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-600 text-center">{error}</p>}

            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white mx-4 px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-300 cursor-pointer"
                >
                    {loading ? 'Saving...' : buttonText}
                </button>
            </div>
        </form>
    );
}
