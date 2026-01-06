import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="container" style={{ padding: 'var(--spacing-lg) 0', marginTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '0.9rem', color: '#666' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <Link href="/profile">Profile</Link>
                <Link href="/contact">Contact</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Sydney Life Blog</p>
        </footer>
    );
}
