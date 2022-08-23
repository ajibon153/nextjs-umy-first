// _app.js adalah Component yg ototmatis di render saat merender setiap page

import Layout from '../components/layout/layout';
import Notification from '../components/notification/notification';
import { NotificationProvider } from '../store/context/notofication-context';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Layout>
        <Head>
          <meta
            name='viewport'
            content='inital-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}

export default MyApp;
