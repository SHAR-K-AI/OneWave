import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

/**
 *
 * @param req
 * @param params
 * @constructor
 */
export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const filePath = path.resolve(process.cwd(), 'audio', `${slug}.mp3`);

    try {
        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath);
            return new NextResponse(file, {
                headers: {
                    'Content-Type': 'audio/mp3',
                },
            });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
