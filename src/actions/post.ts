'use server';

import { savePost } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = `${Date.now()}-${imageFile.name}`;
        const uploadPath = join(process.cwd(), 'public/images', filename);
        await writeFile(uploadPath, buffer);
        imageUrl = `/images/${filename}`;
    } else {
        // Default fallback
        imageUrl = '/images/beach.png'
    }

    const newPost = {
        id: Date.now().toString(),
        title,
        content,
        image: imageUrl,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
    };

    await savePost(newPost);
    revalidatePath('/');
}
