"use client"

import { useState, useCallback } from "react"
import Terminal from "@/components/Terminal"
import BlinkingCursor from "@/components/BlinkingCursor"
import Links from "@/components/Links"
import styles from "./page.module.css"

interface HomeClientProps {
  interests: string
  latestDate: string
}

export default function HomeClient({ interests, latestDate }: HomeClientProps) {
  const [terminalOpen, setTerminalOpen] = useState(true)

  const handleQuit = useCallback(() => setTerminalOpen(false), [])
  const handleReopen = useCallback(() => setTerminalOpen(true), [])

  if (terminalOpen) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <Terminal onQuit={handleQuit} />
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title} onClick={handleReopen}>
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
