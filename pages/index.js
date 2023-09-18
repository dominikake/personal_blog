import Head from "next/head";
import WithBackgroundImage from "@/components/hero";
import FooterSmallCentered from "@/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jan Go Site</title>
        <meta
          name="description"
          content="Thoughts, Discoveries, Tech Unveilede"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithBackgroundImage />
      <FooterSmallCentered />
    </>
  );
}
