import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'
import BlogPostCard from '@/components/BlogPostCard'
import styles from './page.module.css'

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 className={styles.title}>Blog</h1>
        </header>
        
        <div className={styles.posts}>
          {posts.length === 0 ? (
            <p className={styles.noPosts}>No blog posts yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}