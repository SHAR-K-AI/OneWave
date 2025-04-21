import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/client/apiClient';

export interface Track {
    id: string;
    slug: string;
    title: string;
    album: string;
    artist: string;
    audioFile: string;
    updatedAt: string;
    coverImage: string;
    genres: string[] | { id: string; name: string }[];
}

export interface FiltersProps {
    page?: number | string[] | undefined;
    limit?: number | string[] | undefined;
    sortBy?: string | string[] | undefined;
    order?: string | string[] | undefined;
    search?: string | string[] | undefined;
    genre?: string | string[] | undefined;
    artist?: string | string[] | undefined;
}

export const getTracks = async (
    { page, limit, sortBy, order, search, genre, artist }: FiltersProps
) => {
    try {
        const queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page.toString());
        if (limit) queryParams.append('limit', limit.toString());
        if (sortBy) queryParams.append('sort', Array.isArray(sortBy) ? sortBy.join(',') : sortBy);
        if (order) queryParams.append('order', Array.isArray(order) ? order.join(',') : order);
        if (search) queryParams.append('search', Array.isArray(search) ? search.join(',') : search);
        if (genre) queryParams.append('genre', Array.isArray(genre) ? genre.join(',') : genre);
        if (artist) queryParams.append('artist', Array.isArray(artist) ? artist.join(',') : artist);


        const queryString = queryParams.toString();
        return await apiClient.get(`/tracks?${queryString}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to fetch tracks: ${error.message}`);
        } else {
            toast.error('Failed to fetch tracks.');
        }
        throw error;
    }
};

export const getTrackBySlug = async (slug: string): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.get(`/tracks/${slug}`);
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to load track by slug: ${error.message}`);
        } else {
            toast.error('Failed to load track by slug.');
        }
        throw error;
    }
};

export const createTrack = async (data: Track): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.post('/tracks', data);
        toast.success('Track created successfully!');
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to create track: ${error.message}`);
        } else {
            toast.error('Failed to create track.');
        }
        throw error;
    }
};

export const updateTrack = async (trackId: string, data: Track): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.put(`/tracks/${trackId}`, data);
        toast.success('Track updated!');
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to update track: ${error.message}`);
        } else {
            toast.error('Failed to update track.');
        }
        throw error;
    }
};

export const deleteTrack = async (id: string | undefined): Promise<AxiosResponse<void>> => {
    try {
        const response = await apiClient.delete(`/tracks/${id}`);
        toast.success('Track deleted!');
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Error deleting track: ${error.message}`);
        } else {
            toast.error('Error deleting track.');
        }
        throw error;
    }
};

export const uploadTrackFile = async (trackId: string, file: File): Promise<AxiosResponse> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`/tracks/${trackId}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('File uploaded!');
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to upload file: ${error.message}`);
        } else {
            toast.error('Failed to upload file.');
        }
        throw error;
    }
};

export const deleteMultipleTracks = async (ids: string[]): Promise<AxiosResponse<void>> => {
    try {
        const response = await apiClient.post('/tracks/delete', { ids });
        toast.success('Tracks deleted successfully!');
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to delete multiple tracks: ${error.message}`);
        } else {
            toast.error('Failed to delete multiple tracks.');
        }
        throw error;
    }
};

export const deleteTrackFile = async (trackId: string): Promise<AxiosResponse<void>> => {
    try {
        const response = await apiClient.delete(`/tracks/${trackId}/file`);
        toast.success('File deleted from track!');
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(`Failed to delete track file: ${error.message}`);
        } else {
            toast.error('Failed to delete track file.');
        }
        throw error;
    }
};
