'use client';

import { useState } from 'react';

export default function LikeButton({ initialLikes = 0 }: { initialLikes?: number }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                color: liked ? 'var(--accent)' : '#ccc',
                transition: 'color 0.3s ease'
            }}
            aria-label="いいねボタン"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span style={{ color: 'var(--foreground)' }}>{likes}</span>
        </button>
    );
}
