import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export const getAudioFile = (fileSlug: string): Promise<AxiosResponse<Blob>> => {
    return apiClient.get(`files/${fileSlug}`, {
        responseType: 'arraybuffer',
    });
};
