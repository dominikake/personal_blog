import Link from 'next/link'
import styles from './not-found.module.css'

export default function BlogNotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>404 - Blog Post Not Found</h1>
        <p className={styles.message}>
          Sorry, the blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className={styles.actions}>
          <Link href="/blog" className={styles.link}>
            ← Back to Blog
          </Link>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}