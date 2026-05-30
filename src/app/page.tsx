import BlinkingCursor from "@/components/BlinkingCursor"
import Links from "@/components/Links"
import site from "@/content/site.json"
import { getAllBlogPosts } from "@/lib/blog"
import styles from "./page.module.css"

export default function Home() {
  const posts = getAllBlogPosts()
  const interests = site.interests.join(", ")
  const latestDate = posts.length > 0 ? posts[0].date : site.interestsUpdated

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            jan go
            <BlinkingCursor />
          </h1>

          <p className={styles.interests}>
            <span className={styles.interestsLabel}>into:</span> {interests}
          </p>
          <p className={styles.updated}>updated {latestDate}</p>

          <div className={styles.links}>
            <Links />
          </div>
        </header>
      </div>
    </main>
  )
}