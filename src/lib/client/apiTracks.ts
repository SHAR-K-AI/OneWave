import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
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

export const getTracks = async ({
                                    page, limit, sortBy, order, search, genre, artist
                                }: GetTracksParams) => {
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

export const getTrackBySlug = async (slug: string): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.get(`/tracks/${slug}`);
        return response;
    } catch (error: any) {
        toast.error('Failed to load track by slug.');
        throw error;
    }
};

export const getTrackById = async (id: string): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.get(`/tracks/${id}`);
        return response;
    } catch (error: any) {
        toast.error('Failed to load track by ID.');
        throw error;
    }
};

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

export const updateTrack = async (id: string, data: TrackData): Promise<AxiosResponse<Track>> => {
    try {
        const response = await apiClient.put(`/tracks/${id}`, data);
        toast.success('Track updated!');
        return response;
    } catch (error: any) {
        toast.error('Failed to update track.');
        throw error;
    }
};

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

export const uploadTrackFile = async (id: number, file: File): Promise<AxiosResponse> => {
    console.log(id, "id")
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`/tracks/${id}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('File uploaded!');
        return response;
    } catch (error: any) {
        toast.error('Failed to upload file.');
        throw error;
    }
};
