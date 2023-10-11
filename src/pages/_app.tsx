import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '../redux/store';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import i18n from '@/i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';
import { WordCv } from '@/requests/wordCv'
import { changeTheme, setDark, setLight } from '@/redux/slice/themeSlice'
import { useDispatch } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  function AppContent() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const currentLanguage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
  
      if(currentLanguage) i18n.changeLanguage(currentLanguage);
  
      new WordCv().getWordAllowedLanguages();
  
      
      const getTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      if (getTheme) {
        if(getTheme === 'dark') dispatch(setDark())

        else dispatch(setLight())
      }
    }, []);
  
    return <Component {...pageProps} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="1050756533967-43vpflrm53clkaf00g5jdngc5ig68ci0.apps.googleusercontent.com">
          <Head>
                <link href='https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap' rel='stylesheet' />
          </Head>
          <I18nextProvider i18n={i18n}>
            <AppContent />
          </I18nextProvider>
        </GoogleOAuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
