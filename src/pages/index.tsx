import { NoSignedLayout } from '@/layouts/noSignedLayout/noSignedLayout'
import { RootState } from '@/redux/store'
import { HomeDiv } from '@/styles/home.module'
import { useSelector } from 'react-redux'
import Head from 'next/head';
import { useTranslation } from 'react-i18next';


function SEO() {
  return (
    <Head>
      <title>Free CV Builder</title>
      <meta name="title" content="Free CV Builder"/>
      <meta name="description" content="Create your professional CV in Word format with our free CV builder, provide your information and we take care of the rest."/>
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://www.iresume.clould/"/>
      <meta property="og:title" content="Free CV Builder"/>
      <meta property="og:description" content="Create your professional CV in Word format with our free CV Builder, provide your information and we take care of the rest."/>
      <meta property="og:image" content="https://www.iresume.clould/metaimage.jpg"/>

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content="https://www.iresume.clould/"/>
      <meta property="twitter:title" content="Free CV Builder"/>
      <meta property="twitter:description" content="Create your professional CV in Word format with our free CV Builder, provide your information and we take care of the rest."/>
      <meta property="twitter:image" content="https://www.iresume.clould/twittermetaimage.jpg"/>
    </Head>
  );
}

export default function Home() {
  const isDark = useSelector((state: RootState) => state.theme.isDark)
  const { t } = useTranslation();

  return (
    <NoSignedLayout>
      <>
        <SEO/>

        <HomeDiv
          isDark={isDark}
        >
          <div className='container'>
            <h1>iResume</h1>
            <p>
              {t("index")}<br /> 
              <span className='freeText'>
                {t("index_highlight")}
              </span> 
            </p>
          </div>
        </HomeDiv>
      </>
    </NoSignedLayout>
  )
}
