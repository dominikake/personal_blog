import Link from 'next/link'
import styles from './BlogPostCard.module.css'

interface BlogPostCardProps {
  title: string
  date: string
  excerpt: string
  slug: string
}

export default function BlogPostCard({ title, date, excerpt, slug }: BlogPostCardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/blog/${slug}`} className={styles.link}>
        <h2 className={styles.title}>{title}</h2>
        <time className={styles.date}>{date}</time>
        <p className={styles.excerpt}>{excerpt}</p>
      </Link>
    </div>
  )
}