import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProfile } from '@/lib/db';

export default async function Profile() {
    const profile = await getProfile();

    return (
        <>
            <Header />
            <main className="container fade-in" style={{ maxWidth: '600px', margin: 'var(--spacing-lg) auto', textAlign: 'center' }}>
                <h1 style={{ marginBottom: 'var(--spacing-md)' }}>About Me</h1>
                <div style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: 'var(--secondary)',
                    borderRadius: '50%',
                    margin: '0 auto var(--spacing-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                }}>
                    {profile?.avatar || '🇦🇺'}
                </div>
                <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xs)' }}>
                    {profile?.name || 'シドニー在住の会社員'}
                </p>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {profile?.bio || 'シドニーでの生活を記録していきます。'}
                </div>
            </main>
            <Footer />
        </>
    );
}
