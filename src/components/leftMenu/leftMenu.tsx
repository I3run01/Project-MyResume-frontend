import { useSelector } from 'react-redux'
import { LeftMenuDiv } from './leftMenu.module'
import { RootState } from '@/redux/store'
import { changeTheme } from '@/redux/slice/themeSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const LeftMenu = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()
    const dispatch = useDispatch()

    return (
        <LeftMenuDiv
        isDark = {isDark}
        >
            <div className='options'>         
                <div onClick={() => router.push('./curriculum')}>Curriculum</div>
                <div onClick={() => router.push('./project')}>Project</div>
            </div>
            <div className='settings' onClick={() => dispatch(changeTheme())}>
                <p>change theme</p>
            </div>
        </LeftMenuDiv>
    )
}