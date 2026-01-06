import Link from 'next/link';
import { Post } from '@/lib/db';

/* eslint-disable @next/next/no-img-element */
export default function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/post/${post.id}`} className="fade-in" style={{ display: 'block' }}>
            <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                <img
                    src={post.image}
                    alt={post.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                    }}
                    className="hover:scale-105"
                />
            </div>
            <h3 style={{ marginTop: '0.8rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{post.title}</h3>
            <p style={{
                marginTop: '0.4rem',
                fontSize: '0.9rem',
                color: '#666',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.5'
            }}>
                {post.content}
            </p>
        </Link>
    );
}
