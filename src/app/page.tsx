import styles from "./page.module.css"
import BlinkingCursor from "@/components/BlinkingCursor"
import Links from "@/components/Links"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        jan go
        <BlinkingCursor />
      </h1>
      <Links />
    </main>
  )
}