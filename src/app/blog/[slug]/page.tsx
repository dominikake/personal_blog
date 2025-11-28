import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog'
import styles from './page.module.css'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
          <h1 className={styles.title}>{post.title}</h1>
          <time className={styles.date}>{post.date}</time>
        </header>
        
        <article className={styles.content}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  )
}