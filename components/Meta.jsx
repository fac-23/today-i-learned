import Head from "next/head";

export default function customHead({ siteTitle }) {
  return (
    <Head>
      <link rel="icon" href="/images/TIL.svg" />
      <meta
        name="description"
        content="Collaborate and share markdown code snippets"
      />
      <meta
        property="og:image"
        content="https://today-i-learned-vert.vercel.app/images/TIL.svg"
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
