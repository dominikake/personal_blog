#!/usr/bin/env bun
import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import { z } from 'zod'

// Define the frontmatter schema
const frontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format"),
  excerpt: z.string().min(1, "Excerpt is required").max(100, "Excerpt must be 100 characters or less")
})

// Helper function to sanitize title to filename
function sanitizeTitleToFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

// Helper function to check if excerpt is one sentence
function isOneSentence(excerpt: string): boolean {
  const sentences = excerpt.split(/[.!?]/).filter(s => s.trim().length > 0)
  return sentences.length <= 1
}

// Helper function to truncate excerpt to one sentence
function truncateToOneSentence(excerpt: string): string {
  const sentenceEnd = excerpt.search(/[.!?]/)
  if (sentenceEnd === -1) {
    return excerpt.length > 100 ? excerpt.substring(0, 97) + '...' : excerpt
  }
  const truncated = excerpt.substring(0, sentenceEnd + 1)
  return truncated.length > 100 ? truncated.substring(0, 97) + '...' : truncated
}

// Helper function to get file modification date
function getFileModDate(filePath: string): string {
  const stats = fs.statSync(filePath)
  return stats.mtime.toISOString().split('T')[0]
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { data: any, content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content: content.trim() }
  }

  try {
    const frontmatterStr = match[1]
    const markdownContent = match[2].trim()
    const data = yaml.load(frontmatterStr)
    return { data, content: markdownContent }
  } catch (error) {
    console.error(`Error parsing YAML frontmatter: ${error}`)
    return { data: {}, content: content.trim() }
  }
}

// Validate and fix a single markdown file
function validateFile(filePath: string): { valid: boolean, fixed: boolean, errors: string[], fixes: string[], newFilePath?: string } {
  const errors: string[] = []
  const fixes: string[] = []
  let fixed = false
  let valid = true
  let newFilePath: string | undefined

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = parseFrontmatter(fileContent)
    const fileName = path.basename(filePath, '.md')

    // Check if frontmatter exists
    if (Object.keys(data).length === 0) {
      errors.push(`Missing frontmatter in ${fileName}.md`)
      valid = false
      return { valid, fixed, errors, fixes }
    }

    // Validate frontmatter structure
    const validationResult = frontmatterSchema.safeParse(data)
    
    if (!validationResult.success) {
      valid = false
      validationResult.error.issues.forEach(issue => {
        errors.push(`${fileName}.md: ${issue.path.join('.')} - ${issue.message}`)
      })
    }

    // Check filename-title consistency
    if (data.title) {
      const expectedFilename = sanitizeTitleToFilename(data.title)
      if (expectedFilename !== fileName) {
        errors.push(`${fileName}.md: Filename should be "${expectedFilename}.md" based on title "${data.title}"`)
        valid = false
        // Note: File renaming disabled for now to prevent duplicates
      }
    }

    // Check excerpt length and sentence structure
    if (data.excerpt) {
      let excerptFixed = false
      
      if (data.excerpt.length > 100) {
        const truncated = truncateToOneSentence(data.excerpt)
        if (truncated !== data.excerpt) {
          data.excerpt = truncated
          excerptFixed = true
        }
      }
      
      if (!isOneSentence(data.excerpt)) {
        const truncated = truncateToOneSentence(data.excerpt)
        if (truncated !== data.excerpt) {
          data.excerpt = truncated
          excerptFixed = true
        }
      }
      
      if (excerptFixed) {
        fixes.push(`Fixed excerpt in ${fileName}.md to be one sentence`)
        fixed = true
      }
    }

    // Auto-fix missing date
    if (!data.date) {
      data.date = getFileModDate(filePath)
      fixes.push(`Added missing date to ${fileName}.md: ${data.date}`)
      fixed = true
    }

    // Write fixed content back to file
    if (fixed) {
      const yamlStr = yaml.dump(data, { 
        indent: 2, 
        lineWidth: 0,
        noRefs: true,
        quotingType: '"'
      })
      const targetPath = newFilePath || filePath
      const newContent = `---\n${yamlStr}---\n\n${content}`
      fs.writeFileSync(targetPath, newContent, 'utf8')
    }

  } catch (error) {
    errors.push(`Error processing ${filePath}: ${error}`)
    valid = false
  }

  return { valid, fixed, errors, fixes, newFilePath }
}

// Main validation function
async function validateFrontmatter(): Promise<void> {
  const blogDir = path.join(process.cwd(), 'src/content/blog')
  
  if (!fs.existsSync(blogDir)) {
    console.error('Blog directory not found:', blogDir)
    process.exit(1)
  }

  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'))
  
  if (files.length === 0) {
    console.log('No markdown files found in blog directory')
    process.exit(0)
  }

  console.log(`Validating ${files.length} blog posts...`)
  
  let allValid = true
  let totalFixes = 0
  const allErrors: string[] = []
  const allFixes: string[] = []

  // Process files once and collect results
  for (const file of files) {
    const filePath = path.join(blogDir, file)
    const result = validateFile(filePath)
    
    if (!result.valid) {
      allValid = false
      allErrors.push(...result.errors)
    }
    
    if (result.fixed) {
      totalFixes++
      allFixes.push(...result.fixes)
    }
  }

  // Report results
  console.log('\n=== Validation Results ===')
  
  if (allFixes.length > 0) {
    console.log('\n🔧 Auto-fixed issues:')
    allFixes.forEach(fix => console.log(`  ✓ ${fix}`))
  }
  
  if (allErrors.length > 0) {
    console.log('\n❌ Validation errors:')
    allErrors.forEach(error => console.log(`  ✗ ${error}`))
    console.log('\nPlease fix these issues manually.')
  }
  
  if (allValid && totalFixes === 0) {
    console.log('\n✅ All blog posts are valid!')
  } else if (allValid && totalFixes > 0) {
    console.log(`\n✅ All blog posts are now valid! (Fixed ${totalFixes} files)`)
  }

  process.exit(allValid ? 0 : 1)
}

// Run validation
validateFrontmatter().catch(error => {
  console.error('Validation script failed:', error)
  process.exit(1)
})