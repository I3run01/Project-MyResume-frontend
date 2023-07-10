import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
            <link href='https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap' rel='stylesheet' />
            <link href='https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap' rel='stylesheet' />
      </Head>
      <Component {...pageProps} />   
    </Provider>
  )
}
