import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';
import {getAudioFile} from "@/lib/client/apiFile";

/**
 *
 * @param fileBuffer
 */
const sendAudioFileResponse = (fileBuffer: Blob | Buffer) => {
    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': 'audio/mp3',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};

export async function GET(
    request: Request,
    {params}: { params: Promise<{ slug: string }> }
) {
    const {slug} = await params;

    try {
        const response = await getAudioFile(slug);

        if (response.status === 200) {
            const file = response.data;
            return sendAudioFileResponse(file);
        } else {
            throw new Error('File not found');
        }
    } catch (error) {
        const filePath = path.resolve(process.cwd(), 'audio', `${slug}.mp3`);

        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath);
            return sendAudioFileResponse(file);
        } else {
            console.error(error);
            return NextResponse.json({error: 'File not found'}, {status: 404});
        }
    }
}
