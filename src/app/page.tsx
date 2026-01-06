import { getPosts } from '@/lib/db';
import PostCard from '@/components/PostCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Header />
      <main className="container" style={{ paddingBottom: 'var(--spacing-lg)' }}>
        <p style={{
          textAlign: 'center',
          margin: 'var(--spacing-lg) 0',
          fontSize: '0.9rem',
          color: '#888',
          letterSpacing: '0.05em'
        }}>
          2024年4月から。シドニーの日々を綴る。
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--spacing-md)'
        }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
