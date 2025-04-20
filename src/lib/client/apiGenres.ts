import apiClient from '@/lib/client/apiClient';

export const getGenres = (): Promise<{ data: string[] }> =>
    apiClient.get('/genres');
