import { AxiosResponse } from 'axios';
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
    const queryParams = new URLSearchParams();

    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());
    if (sortBy) queryParams.append('sort', sortBy);
    if (order) queryParams.append('order', order);
    if (search) queryParams.append('search', search);
    if (genre) queryParams.append('genre', genre);
    if (artist) queryParams.append('artist', artist);

    const queryString = queryParams.toString();
    return apiClient.get(`/tracks?${queryString}`);
};


export const getTrackBySlug = (slug: string): Promise<AxiosResponse<Track>> =>
    apiClient.get(`/tracks/${slug}`);

export const getTrackById = (id: string): Promise<AxiosResponse<Track>> =>
    apiClient.get(`/tracks/${id}`);

export const createTrack = (data: TrackData): Promise<AxiosResponse<Track>> =>
    apiClient.post('/tracks', data);

export const updateTrack = (id: string, data: TrackData): Promise<AxiosResponse<Track>> =>
    apiClient.put(`/tracks/${id}`, data);

export const deleteTrack = (id: number): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/tracks/${id}`);

export const uploadTrackFile = (id: string, file: File): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post(`/tracks/${id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
