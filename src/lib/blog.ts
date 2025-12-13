import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      data: { title: '', date: '', excerpt: '' },
      content: content.trim()
    }
  }

  const frontmatterStr = match[1]
  const markdownContent = match[2].trim()
  
  const data: { title: string; date: string; excerpt: string } = {
    title: '',
    date: '',
    excerpt: ''
  }

  const lines = frontmatterStr.split('\n')
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i]
    const colonIndex = line.indexOf(':')
    
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()
      
      // Handle YAML folded scalars (>-) and block scalars (|)
      if (value === '>-' || value === '|') {
        i++ // Move to the next line
        const foldedLines: string[] = []
        
        // Collect all indented lines until we hit a line with same or less indentation
        while (i < lines.length) {
          const currentLine = lines[i]
          if (currentLine.trim() === '') {
            foldedLines.push('') // Preserve empty lines for >-
            i++
          } else if (currentLine.startsWith('  ') || currentLine.startsWith('\t')) {
            // Remove the indentation (2 spaces or 1 tab)
            foldedLines.push(currentLine.replace(/^( {2}|\t)/, ''))
            i++
          } else {
            break // End of folded block
          }
        }
        
        // Join the lines appropriately
        if (value === '>-') {
          // Folded scalar: join lines with spaces, remove trailing whitespace
          value = foldedLines.join(' ').replace(/\s+/g, ' ').trim()
        } else {
          // Block scalar: preserve newlines
          value = foldedLines.join('\n').trim()
        }
      } else {
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        i++
      }
      
      if (key === 'title') data.title = value
      if (key === 'date') data.date = value
      if (key === 'excerpt') data.excerpt = value
    } else {
      i++
    }
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
      content,
    }
  } catch {
    return null
  }
}