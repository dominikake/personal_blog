import Head from "next/head";
import WithBackgroundImage from "@/components/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Thoughts, Discoveries, Tech Unveilede"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithBackgroundImage />
    </>
  );
}
