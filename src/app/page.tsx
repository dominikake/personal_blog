import site from "@/content/site.json"
import { getAllBlogPosts } from "@/lib/blog"
import Terminal from "@/components/Terminal"
import styles from "./page.module.css"

export default function Home() {
  const posts = getAllBlogPosts()
  const interests = site.interests.join(", ")
  const latestDate = posts.length > 0 ? posts[0].date : site.interestsUpdated

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <Terminal />
        </section>

        <footer className={styles.footer}>
          <p className={styles.interests}>
            <span className={styles.interestsLabel}>into:</span> {interests}
          </p>
          <p className={styles.updated}>updated {latestDate}</p>
        </footer>
      </div>
    </main>
  )
}
