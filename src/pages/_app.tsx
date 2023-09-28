import { AppProps } from "next/app";
import Head from "next/head";

import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ShardDog TGA Encryption POC</title>
        <meta name="description" content={`ShardDog TGA Encryption POC`} />
        <meta name="twitter:card" content="summary"></meta>
        <meta
          name="twitter:image"
          content={`https://my.shard.dog/favicon.png`}
        />
        <meta name="twitter:title" content={`ShardDog TGA Encryption`} />
        <meta name="twitter:url" content={`https://my.shard.dog`}></meta>
        <meta name="twitter:description" content={`ShardDog TGA Encryption`} />

        <meta property="og:card" content="summary" />
        <meta
          property="og:image"
          content={`https://my.shard.dog/favicon.png`}
        />
        <meta property="og:title" content={`ShardDog TGA Encryption`} />
        <meta property="og:url" content={`https://my.shard.dog/`} />
        <meta property="og:description" content={`ShardDog TGA Encryption`} />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
