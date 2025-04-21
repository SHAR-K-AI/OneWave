'use client';

import classNames from "classnames";
import {useForm} from 'react-hook-form';
import {Track} from '@/lib/client/apiTracks';
import {getGenres} from '@/lib/client/apiGenres';

import AppImage from "@/components/widgets/AppImage";
import Spinner from "@/components/widgets/Spinner";
import InputField from "@/components/forms/fields/InputField";
import AsyncGenreSelect from "@/components/forms/fields/AsyncSelectField";
import UploadTrackFileButton from "@/components/buttons/UploadTrackFileButton";

type TrackFormProps = {
    onSubmit: (data: Track) => Promise<void>;
    setAudioFile: (data: File) => void;
    defaultValues?: Partial<Track>;
    loading?: boolean;
    uploading?: boolean;
    error?: string | null;
    buttonText?: string;
    className?: string;
};

export default function TrackForm(
    {
        onSubmit,
        defaultValues = {},
        loading = false,
        uploading = false,
        error,
        setAudioFile,
        buttonText = 'Submit',
        className
    }: TrackFormProps
) {
    const {
        watch,
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<Track>({
        defaultValues: {
            title: defaultValues.title || '',
            artist: defaultValues.artist || '',
            album: defaultValues.album || '',
            genres: defaultValues.genres || [],
            coverImage: defaultValues.coverImage || '',
        },
    });

    return (
        <div
            className={classNames(className, "grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white overflow-hidden")}>
            <div className="relative flex flex-col justify-center items-center space-y-6">
                <AppImage
                    width={300}
                    height={300}
                    alt="Track Image"
                    key={watch("coverImage")}
                    src={watch("coverImage")}
                    className="w-80 h-80 object-cover rounded-full"
                />
                <div className="p-4 text-center">
                    <h1 className="text-xl font-bold mb-4">Upload Your Audio File</h1>
                    <UploadTrackFileButton onFileSelect={setAudioFile} trackId={defaultValues.id} hasAudio={!!defaultValues.audioFile}/>
                    {uploading && (
                        <div className="text-center text-blue-600">
                            <Spinner/>
                            Uploading audio file...
                        </div>
                    )}
                </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">{buttonText}</h1>
                {/*TODO data-testid="track-form" - The form container"*/}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="track-form">
                    {/*TODO data-testid="input-title" - Title input field"*/}
                    <InputField
                        dataTestId="input-title"
                        label="Title"
                        placeholder="Enter track title"
                        register={register('title', {required: 'Title is required'})}
                        error={errors.title}
                    />
                    {/*TODO data-testid="input-artist" - Artist input field"*/}
                    <InputField
                        dataTestId="input-artist"
                        label="Artist"
                        placeholder="Enter artist name"
                        register={register('artist', {required: 'Artist is required'})}
                        error={errors.artist}
                    />
                    {/*TODO data-testid="input-album" - Album input field"*/}
                    <InputField
                        dataTestId="input-album"
                        label="Album"
                        placeholder="Enter album name"
                        register={register('album')}
                        error={errors.album}
                    />
                    {/*TODO data-testid="genre-selector" - Genre selection control"*/}
                    <AsyncGenreSelect
                        dataTestId="genre-selector"
                        name="genres"
                        label="Genres"
                        control={control}
                        client={getGenres}
                        error={errors.genres?.message}
                    />
                    {/*TODO data-testid="input-cover-image" - Cover image URL input field"*/}
                    <InputField
                        dataTestId="input-cover-image"
                        label="Cover Image"
                        placeholder="Enter cover image URL"
                        register={register('coverImage')}
                        error={errors.coverImage}
                    />

                    {error && <p className="text-red-600 text-center" data-testid="error">{error}</p>}

                    <div className="flex justify-center">
                        {/*TODO data-testid="submit-button" - Form submit button"*/}
                        <button
                            data-testid="submit-button"
                            type="submit"
                            disabled={loading}
                            aria-disabled={loading}
                            data-loading={loading ? "true" : "false"}
                            className="bg-blue-600 text-white mx-4 px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-300 cursor-pointer"
                        >
                            {loading ? 'Saving...' : buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
