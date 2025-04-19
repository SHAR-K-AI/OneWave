'use client';

import { Controller, useForm } from 'react-hook-form';
import FormControl from '@/components/forms/FormControl';
import { getGenres } from "@/lib/client/apiGenres";
import BackToTracksButton from "@/components/buttons/BackToTracksButton";

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
    setCoverImage: (url: string) => void;  // Проп для встановлення зображення обкладинки
};

export default function TrackForm({
                                      onSubmit,
                                      defaultValues = {},
                                      loading = false,
                                      error,
                                      buttonText = "Submit",
                                      setCoverImage,  // отримаємо функцію для встановлення зображення
                                  }: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TrackFormData>({
        defaultValues: {
            title: defaultValues.title || '',
            artist: defaultValues.artist || '',
            album: defaultValues.album || '',
            genres: defaultValues.genres || [],
            coverImage: defaultValues.coverImage || '',
        },
    });

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, "sdfsfsd")
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
                name="genres[]"
                errors={errors}
                control={control}
                client={getGenres}
                isMultiple={true}
                isSearchable={false}
                controlType="async-select"
                placeholder="e.g. rock, pop"
                label="Genres (comma-separated)"
                labelClassName="text-sm font-medium text-gray-700"
                getData={(data: string[]) => {
                    return data.map((item: string) => ({
                        value: item,
                        name: item,
                    }));
                }}
            />
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                <input
                    {...register('coverImage')}
                    onChange={handleCoverImageChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cover image URL"
                />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <div className="flex justify-center">
                <BackToTracksButton />
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
