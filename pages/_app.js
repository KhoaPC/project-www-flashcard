import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar';
import images from 'assets';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={images.logo.src} />
      </Head>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  );
}
