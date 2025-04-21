/**
 *
 * @param fileName
 */
export function getAudioFileUrl(fileName: string): string {
    return `/api/audio/${fileName}`;
}