import styles from "./Links.module.css"

export default function Links() {
  return (
    <div className={styles.links}>
      <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
        linkedin
      </a>
      <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
        github
      </a>
      <a href="/blog">blog</a>
    </div>
  )
}

