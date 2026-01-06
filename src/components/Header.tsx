import Link from 'next/link';

export default function Header() {
    return (
        <header className="container" style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                Sydney Diary
            </Link>
        </header>
    );
}
