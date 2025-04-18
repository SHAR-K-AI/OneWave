'use client';

import { Controller, useForm } from 'react-hook-form';
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
};

export default function TrackForm({
                                      onSubmit,
                                      defaultValues = {},
                                      loading = false,
                                      error,
                                      buttonText = "Submit",
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

    console.log(defaultValues, "defaultValues")

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

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Genres (comma-separated)</label>
                <Controller
                    control={control}
                    name="genres"
                    render={({ field }) => (
                        <input
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. rock, pop"
                            value={field.value?.join(', ') ?? ''}
                            onChange={(e) => {
                                const genresArray = e.target.value.split(',').map((g) => g.trim());
                                field.onChange(genresArray);
                            }}
                        />
                    )}
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                <input
                    {...register('coverImage')}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cover image URL"
                />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-300 cursor-pointer"
                >
                    {loading ? 'Saving...' : buttonText}
                </button>
            </div>
        </form>
    );
}
