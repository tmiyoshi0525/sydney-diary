'use client';

import { createPost } from '@/actions/post';
import { useState } from 'react';

export default function AdminPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        await createPost(formData);
        setLoading(false);
        alert('記事を投稿しました！');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <main className="container" style={{ padding: '2rem 0', maxWidth: '600px' }}>
            <section style={{ marginBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>記事投稿</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>タイトル</label>
                        <input
                            name="title"
                            required
                            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>写真</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>本文</label>
                        <textarea
                            name="content"
                            required
                            rows={10}
                            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px', lineHeight: '1.6' }}
                            placeholder="ここに日々の出来事を綴ってください..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: '#4A90E2',
                            color: 'white',
                            padding: '1rem',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? '投稿中...' : '公開する'}
                    </button>
                </form>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '4rem' }} />

            <section>
                <h1 style={{ marginBottom: '2rem' }}>プロフィール編集</h1>
                <form action={async (formData) => {
                    const { updateProfileAction } = await import('@/actions/profile');
                    await updateProfileAction(formData);
                    alert('プロフィールを更新しました！');
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>お名前</label>
                        <input
                            name="name"
                            defaultValue="シドニー在住の会社員"
                            required
                            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>アイコン (絵文字など)</label>
                        <input
                            name="avatar"
                            defaultValue="🇦🇺"
                            required
                            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>自己紹介</label>
                        <textarea
                            name="bio"
                            required
                            rows={5}
                            defaultValue={`2024年4月からシドニーでの生活をスタート。\n日々の発見や、変わりゆく街の景色を\n継続的に記録していきます。`}
                            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px', lineHeight: '1.6' }}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#4A90E2',
                            color: 'white',
                            padding: '1rem',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        プロフィールを保存
                    </button>
                </form>
            </section>
        </main>
    );
}
