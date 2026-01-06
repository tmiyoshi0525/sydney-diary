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

export interface Profile {
    id: number;
    name: string;
    bio: string;
    avatar: string;
}

export async function getProfile(): Promise<Profile | null> {
    return await prisma.profile.findUnique({
        where: { id: 1 },
    });
}

export async function updateProfile(data: Partial<Profile>) {
    await prisma.profile.upsert({
        where: { id: 1 },
        update: data,
        create: {
            id: 1,
            name: data.name || 'シドニー在住',
            bio: data.bio || '',
            avatar: data.avatar || '🇦🇺',
        },
    });
}

export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

export async function saveMessage(data: { name: string; email: string; message: string }) {
    await prisma.message.create({
        data,
    });
}

export async function getMessages(): Promise<Message[]> {
    return await prisma.message.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}
