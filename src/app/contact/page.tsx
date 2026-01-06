import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
    return (
        <>
            <Header />
            <main className="container fade-in" style={{ maxWidth: '600px', margin: 'var(--spacing-lg) auto' }}>
                <h1 style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>Contact</h1>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <div>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input type="text" id="name" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" id="email" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                        <textarea id="message" rows={5} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}></textarea>
                    </div>
                    <button type="button" style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '4px',
                        marginTop: '1rem'
                    }}>
                        Send Message
                    </button>
                </form>
            </main>
            <Footer />
        </>
    );
}
