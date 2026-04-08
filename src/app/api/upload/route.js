import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');
    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
   const byteData = await file.arrayBuffer();
   const buffer = Buffer.from(byteData);
   const path = `./public/uploads/${file.name}`;
   await writeFile(path, buffer);
   return NextResponse.json({ message: 'File uploaded successfully', fileName: file.name }, { status: 200 });
}