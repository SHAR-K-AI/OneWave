import {AxiosResponse} from 'axios';
import {toast} from 'react-hot-toast';
import apiClient from '@/lib/client/apiClient';

export interface Track {
    id: string;
    title: string;
    artist: string;
}

export interface TrackData {
    title: string;
    artist: string;
}

interface GetTracksParams {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    search: string;
    genre: string;
    artist: string;
}

/**
 *
 * @param page
 * @param limit
 * @param sortBy
 * @param order
 * @param search
 * @param genre
 * @param artist
 */
export const getTracks = async (
    {page, limit, sortBy, order, search, genre, artist}: GetTracksParams
) => {
    try {
        const queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page.toString());
        if (limit) queryParams.append('limit', limit.toString());
        if (sortBy) queryParams.append('sort', sortBy);
        if (order) queryParams.append('order', order);
        if (search) queryParams.append('search', search);
        if (genre) queryParams.append('genre', genre);
        if (artist) queryParams.append('artist', artist);

        const queryString = queryParams.toString();
        const response = await apiClient.get(`/tracks?${queryString}`);
        return response;
    } catch (error: any) {
        toast.error('Failed to fetch tracks.');
        throw error;
    }
};

/**
 *
 * @param slug
 */
export const getTrackBySlug = async (slug: string): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.get(`/tracks/${slug}`);
        return response;
    } catch (error: any) {
        toast.error('Failed to load track by slug.');
        throw error;
    }
};

/**
 *
 * @param id
 */
export const getTrackById = async (id: string): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.get(`/tracks/${id}`);
        return response;
    } catch (error: any) {
        toast.error('Failed to load track by ID.');
        throw error;
    }
};

/**
 *
 * @param data
 */
export const createTrack = async (data: TrackData): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.post('/tracks', data);
        toast.success('Track created successfully!');
        return response;
    } catch (error: any) {
        toast.error('Failed to create track.');
        throw error;
    }
};

/**
 *
 * @param trackId
 * @param data
 */
export const updateTrack = async (trackId: string, data: TrackData): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.put(`/tracks/${trackId}`, data);
        toast.success('Track updated!');
        return response;
    } catch (error: any) {
        toast.error('Failed to update track.');
        throw error;
    }
};

/**
 *
 * @param id
 */
export const deleteTrack = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        const response = await apiClient.delete(`/tracks/${id}`);
        toast.success('Track deleted!');
        return response;
    } catch (error: any) {
        toast.error('Error deleting track.');
        throw error;
    }
};

/**
 *
 * @param trackId
 * @param file
 */
export const uploadTrackFile = async (trackId: string, file: File): Promise<AxiosResponse> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`/tracks/${trackId}/upload`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        toast.success('File uploaded!');
        return response;
    } catch (error: any) {
        toast.error('Failed to upload file.');
        throw error;
    }
};

/**
 *
 * @param ids
 */
export const deleteMultipleTracks = async (ids: string[]): Promise<AxiosResponse<void>> => {
    try {
        const response = await apiClient.post('/tracks/delete', {ids});
        toast.success('Tracks deleted successfully!');
        return response;
    } catch (error: any) {
        toast.error('Failed to delete multiple tracks.');
        throw error;
    }
};
