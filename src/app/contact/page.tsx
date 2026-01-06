'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { sendContactAction } from '@/actions/contact';

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            const result = await sendContactAction(formData);
            if (result.success) {
                if (result.emailSent) {
                    setSent(true);
                } else {
                    alert('メッセージは保存されましたが、メール通知に失敗しました。\n理由: ' + (result.errorMessage || '不明なエラー'));
                    setSent(true);
                }
            } else {
                alert('送信に失敗しました。\n理由: ' + (result.errorMessage || 'データベースへの保存に失敗しました'));
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('通信エラーが発生しました。インターネット接続を確認してください。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="container fade-in" style={{ maxWidth: '600px', margin: 'var(--spacing-lg) auto' }}>
                <h1 style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>Contact (v2)</h1>

                {sent ? (
                    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--secondary)', borderRadius: '8px' }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>メッセージを送信しました！</p>
                        <p>お問い合わせいただきありがとうございます。<br />確認次第、ご連絡させていただきます。</p>
                        <button
                            onClick={() => setSent(false)}
                            style={{ marginTop: '2rem', color: 'var(--primary)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
                        >
                            別のメッセージを送る
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <div>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '4px',
                                marginTop: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </main>
            <Footer />
        </>
    );
}
