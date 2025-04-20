import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getAudioFile } from "@/lib/client/apiFile";

/**
 * Helper function to send audio file response.
 * @param fileBuffer - The audio file buffer.
 * @param contentLength - The content length of the file.
 * @returns - NextResponse with audio file and headers.
 */
const sendAudioFileResponse = (fileBuffer: Buffer, contentLength: number) => {
    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': 'audio/mp3',
            'Content-Length': contentLength.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        const response = await getAudioFile(slug);

        if (response.status === 200) {
            const file = response.data;
            return sendAudioFileResponse(file, file.byteLength);
        } else {
            throw new Error('File not found');
        }
    } catch (error) {
        const filePath = path.resolve(process.cwd(), 'audio', `${slug}.mp3`);

        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath);
            return sendAudioFileResponse(file, file.byteLength);
        } else {
            console.error(error);
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    }
}
