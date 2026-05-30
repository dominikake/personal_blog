import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  type?: string
  content: string
}

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      data: { title: '', date: '', excerpt: '', type: undefined as string | undefined },
      content: content.trim()
    }
  }

  const frontmatterStr = match[1]
  const markdownContent = match[2].trim()
  
  let parsed: Record<string, unknown> = {}
  try {
    const loaded = yaml.load(frontmatterStr)
    if (loaded && typeof loaded === 'object' && !Array.isArray(loaded)) {
      parsed = loaded as Record<string, unknown>
    }
  } catch {}

  const data = {
    title: typeof parsed.title === 'string' ? parsed.title : '',
    date: typeof parsed.date === 'string' ? parsed.date : '',
    excerpt: typeof parsed.excerpt === 'string' ? parsed.excerpt : '',
    type: typeof parsed.type === 'string' ? parsed.type : undefined,
  }

  return { data, content: markdownContent }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Sanitize slug: allow only URL-safe characters (alphanumeric, dash, underscore)
      const slugRaw = fileName.replace(/\.md$/, '')
      const slug = slugRaw.replace(/[^a-zA-Z0-9\-_]/g, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = parseFrontmatter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        type: data.type,
        content,
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    // Sanitize slug before use
    const safeSlug = slug.replace(/[^a-zA-Z0-9\-_]/g, '')
    const fullPath = path.join(postsDirectory, `${safeSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = parseFrontmatter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      type: data.type,
      content,
    }
  } catch {
    return null
  }
}