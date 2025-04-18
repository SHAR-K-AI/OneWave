import { AxiosResponse } from 'axios';
import apiClient from '@/lib/client/apiClient';

export interface Genres {
    id: string;
    title: string;
    artist: string;
}

export const getGenres = (): Promise<AxiosResponse<{ data: Genres[] }>> =>
    apiClient.get('/genres');
