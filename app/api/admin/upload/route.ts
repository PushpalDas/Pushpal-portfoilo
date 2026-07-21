import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import convert from 'heic-convert';

export async function POST(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File | null;
		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const filename = file.name;
		const ext = path.extname(filename).toLowerCase();

		let finalBuffer = buffer;
		let finalFilename = filename;

		if (ext === '.heic') {
			// Convert to JPEG
			finalBuffer = await convert({
				buffer: buffer,
				format: 'JPEG',
				quality: 0.9,
			});
			// Change file name extension to .jpg
			const baseName = path.basename(filename, ext);
			finalFilename = `${baseName}.jpg`;
		}

		// Save the file to public/static/images/project/
		const saveDir = path.join(
			process.cwd(),
			'public',
			'static',
			'images',
			'project',
		);
		if (!fs.existsSync(saveDir)) {
			fs.mkdirSync(saveDir, { recursive: true });
		}

		// Clean the filename (replace spaces and other problematic characters)
		const sanitizedFilename = finalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
		const filePath = path.join(saveDir, sanitizedFilename);
		fs.writeFileSync(filePath, finalBuffer);

		return NextResponse.json({ success: true, filename: sanitizedFilename });
	} catch (error: any) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{ error: error.message || 'Upload failed' },
			{ status: 500 },
		);
	}
}
