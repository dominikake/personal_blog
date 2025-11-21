import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog'

describe('Blog utilities', () => {
  describe('getAllBlogPosts', () => {
    it('should return an array of blog posts', () => {
      const posts = getAllBlogPosts()
      expect(Array.isArray(posts)).toBe(true)
    })

    it('should return posts sorted by date (newest first)', () => {
      const posts = getAllBlogPosts()
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          expect(posts[i].date >= posts[i + 1].date).toBe(true)
        }
      }
    })

    it('should return posts with required fields', () => {
      const posts = getAllBlogPosts()
      posts.forEach(post => {
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('excerpt')
        expect(post).toHaveProperty('content')
      })
    })
  })

  describe('getBlogPostBySlug', () => {
    it('should return null for non-existent slug', () => {
      const post = getBlogPostBySlug('non-existent-post')
      expect(post).toBeNull()
    })

    it('should return a post for existing slug', () => {
      const posts = getAllBlogPosts()
      if (posts.length > 0) {
        const firstPost = posts[0]
        const post = getBlogPostBySlug(firstPost.slug)
        expect(post).not.toBeNull()
        expect(post?.slug).toBe(firstPost.slug)
      }
    })

    it('should return post with all required fields', () => {
      const posts = getAllBlogPosts()
      if (posts.length > 0) {
        const firstPost = posts[0]
        const post = getBlogPostBySlug(firstPost.slug)
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('excerpt')
        expect(post).toHaveProperty('content')
      }
    })
  })
})