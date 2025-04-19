/**
 *
 * @param fileName
 */
export function getAudioFileUrl(fileName: string): string {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}files/${fileName}`)
    return `/api/audio/${fileName}`;
}