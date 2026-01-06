import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Profile() {
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
                    🇦🇺
                </div>
                <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xs)' }}>シドニー在住の会社員</p>
                <p>2024年4月からシドニーでの生活をスタート。</p>
                <p>日々の発見や、変わりゆく街の景色を</p>
                <p>継続的に記録していきます。</p>
            </main>
            <Footer />
        </>
    );
}
