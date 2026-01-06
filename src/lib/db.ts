import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Post {
    id: string;
    title: string;
    content: string;
    image: string;
    date: string;
    likes: number;
}

export async function getPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return posts;
}

export async function getPost(id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
        where: { id },
    });
}

export async function savePost(newPost: Post) {
    await prisma.post.create({
        data: {
            id: newPost.id,
            title: newPost.title,
            content: newPost.content,
            image: newPost.image,
            date: newPost.date,
            likes: newPost.likes,
        },
    });
}

export async function updatePost(updatedPost: Post) {
    await prisma.post.update({
        where: { id: updatedPost.id },
        data: updatedPost,
    });
}
