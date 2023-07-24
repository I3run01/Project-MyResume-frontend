import { useSelector } from 'react-redux'
import { LeftMenuDiv } from './leftMenu.module'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'

export const LeftMenu = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    return (
        <LeftMenuDiv
        isDark = {isDark}
        >
            <div className='options'>         
                <div onClick={() => router.push('/dashboard/curriculum')}>Curriculum</div>
                <div onClick={() => router.push('/dashboard/project')}>Project</div>
            </div>
            <div className='settings' onClick={() => router.push('../settings')}>
                <p>Settings</p>
            </div>
        </LeftMenuDiv>
    )
}