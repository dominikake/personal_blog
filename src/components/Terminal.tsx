'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import site from "@/content/site.json"
import styles from "./Terminal.module.css"

interface TerminalLine {
  type: "input" | "output" | "system"
  content: string
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "Welcome to jan go's terminal. Type 'help' for available commands." },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const commands: Record<string, (args: string[]) => TerminalLine[]> = {
    help: () => [
      { type: "output", content: "Available commands:" },
      { type: "output", content: "  whoami       - About me" },
      { type: "output", content: "  ls           - List links" },
      { type: "output", content: "  links        - Show link URLs" },
      { type: "output", content: "  blog         - Go to blog" },
      { type: "output", content: "  date         - Current date" },
      { type: "output", content: "  uptime       - Site info" },
      { type: "output", content: "  echo [text]  - Echo text" },
      { type: "output", content: "  banner       - Show banner" },
      { type: "output", content: "  neofetch     - System info" },
      { type: "output", content: "  clear        - Clear terminal" },
      { type: "output", content: "  sudo         - Try it ;)" },
    ],

    whoami: () => [
      { type: "output", content: "jan go" },
      { type: "output", content: "---" },
      { type: "output", content: `Into: ${site.interests.join(", ")}` },
      { type: "output", content: site.tagline },
    ],

    ls: () => [
      { type: "output", content: "linkedin/  github/  blog/" },
    ],

    links: () => [
      { type: "output", content: "linkedin  -> https://www.linkedin.com/in/jan-go-87674b61/" },
      { type: "output", content: "github    -> https://github.com/dominikake" },
      { type: "output", content: "blog      -> /blog" },
    ],

    blog: () => {
      router.push("/blog")
      return [{ type: "system", content: "Navigating to /blog..." }]
    },

    date: () => [
      { type: "output", content: new Date().toString() },
    ],

    uptime: () => [
      { type: "output", content: `Interests last updated: ${site.interestsUpdated}` },
      { type: "output", content: site.tagline },
    ],

    echo: (args) => [
      { type: "output", content: args.join(" ") || "" },
    ],

    banner: () => [
      { type: "output", content: "   ██╗ █████╗ ███╗   ██╗     ██████╗  ██████╗" },
      { type: "output", content: "   ██║██╔══██╗████╗  ██║    ██╔════╝ ██╔═══██╗" },
      { type: "output", content: "   ██║███████║██╔██╗ ██║    ██║  ███╗██║   ██║" },
      { type: "output", content: "   ██║██╔══██║██║╚██╗██║    ██║   ██║██║   ██║" },
      { type: "output", content: "   ██║██║  ██║██║ ╚████║    ╚██████╔╝╚██████╔╝" },
      { type: "output", content: "   ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝  ╚═════╝" },
    ],

    neofetch: () => [
      { type: "output", content: "           __" },
      { type: "output", content: "          / _|" },
      { type: "output", content: "   _ __  | |_    __ _   ___" },
      { type: "output", content: "  | '_ \\ |  _|  / _\` | / __|" },
      { type: "output", content: "  | | | || |   | (_| || (__" },
      { type: "output", content: "  |_| |_||_|    \\__,_| \\___|" },
      { type: "output", content: "" },
      { type: "output", content: `  OS:        Jan Go Linux` },
      { type: "output", content: `  Host:      personal_blog` },
      { type: "output", content: `  Shell:     /bin/bash` },
      { type: "output", content: `  Interests: ${site.interests.join(", ")}` },
      { type: "output", content: `  Tagline:   ${site.tagline}` },
    ],

    sudo: () => [
      { type: "output", content: "Nice try ;)" },
      { type: "system", content: "Event logged. Carry on." },
    ],
  }

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const parts = trimmed.split(/\s+/)
    const cmdName = parts[0]
    const args = parts.slice(1)
    const lowerCmd = cmdName.toLowerCase()

    if (lowerCmd in commands) {
      const output = commands[lowerCmd](args)
      setLines((prev) => [...prev, { type: "input", content: `$ ${cmd}` }, ...output])
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", content: `$ ${cmd}` },
        {
          type: "output",
          content: `bash: ${cmdName}: command not found. Type 'help' for available commands.`,
        },
      ])
    }

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(history[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= history.length) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    }
  }

  return (
    <div className={styles.terminal} onClick={focusInput}>
      <div className={styles.header}>
        <span className={styles.dot} data-color="red" />
        <span className={styles.dot} data-color="yellow" />
        <span className={styles.dot} data-color="green" />
        <span className={styles.title}>jan go@terminal:~/</span>
      </div>
      <div className={styles.body}>
        {lines.map((line, i) => (
          <div key={i} className={styles[line.type]}>
            {line.content}
          </div>
        ))}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>$</span>
          <span className={styles.inputText}>{input}</span>
          <span className={styles.cursor}>▊</span>
        </div>
        <div ref={endRef} />
      </div>
      <input
        ref={inputRef}
        type="text"
        className={styles.hiddenInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-label="Terminal input"
      />
    </div>
  )
}
