import { NoSignedLayout } from '@/layouts/noSignedLayout/noSignedLayout'
import { RootState } from '@/redux/store'
import { HomeDiv } from '@/styles/home.module'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  return (
    <NoSignedLayout>
      <HomeDiv
        isDark={isDark}
      >
        <div className='container'>
          <h1>MyResume</h1>
          <p>The easiest way to have the best resume and share yours skills</p>
        </div>
      </HomeDiv>
    </NoSignedLayout>
  )
}
