'use client'

import { useState, useEffect } from "react"
import styles from "./BlinkingCursor.module.css"

export default function BlinkingCursor() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  return <span className={styles.cursor}>{visible ? "_" : " "}</span>
}

