import Head from 'next/head';
import Layout, { siteTitle, intro, otherText } from '../components/Layout'; // Adjust the path as needed
import utilStyles from '../styles/Home.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

<h1 className="title">
  Read <Link href="/posts/first-post">this page!</Link>
</h1>


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{intro}</p>
        <p>
      ({otherText})
        </p>
      </section>
      <h1>Hi
        <Link href="/posts/first-post">Hello</Link>
      </h1>

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.h2} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {date}
              <br />
              {id}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
} 