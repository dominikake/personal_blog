import styles from "./Links.module.css"

export default function Links() {
  return (
    <div className={styles.links}>
      <a href="https://www.linkedin.com/in/jan-go-87674b61/" target="_blank" rel="noopener noreferrer">
        linkedin
      </a>
      <a href="https://github.com/dominikake" target="_blank" rel="noopener noreferrer">
        github
      </a>
      <a href="/blog">blog</a>
    </div>
  )
}

