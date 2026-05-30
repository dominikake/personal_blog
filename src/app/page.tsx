import site from "@/content/site.json"
import { getAllBlogPosts } from "@/lib/blog"
import HomeClient from "./HomeClient"

export default function Home() {
  const posts = getAllBlogPosts()
  const interests = site.interests.join(", ")
  const latestDate = posts.length > 0 ? posts[0].date : site.interestsUpdated

  return <HomeClient interests={interests} latestDate={latestDate} />
}
