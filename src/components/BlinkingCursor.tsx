'use client'

import { useState, useEffect } from "react"
import styles from "./BlinkingCursor.module.css"

export default function BlinkingCursor() {
  
  return (
  <span className={styles.cursor}>
  _
  </span>
  )
}

