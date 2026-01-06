

import { getPosts, getPost } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LikeButton from '@/components/LikeButton';
import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.id);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>
            <Header />
            <main className="container fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: 'var(--spacing-lg)' }}>
                <div style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                    <Link href="/" style={{ fontSize: '0.9rem', color: '#888' }}>&larr; Back to Home</Link>
                </div>

                <article>
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '8px', marginBottom: 'var(--spacing-md)' }}>
                        <img
                            src={post.image}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <h1 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '2rem' }}>{post.title}</h1>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>{post.date}</p>

                    <div style={{ lineHeight: '2', whiteSpace: 'pre-line', marginBottom: 'var(--spacing-lg)' }}>
                        {post.content}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <LikeButton initialLikes={post.likes} />
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
