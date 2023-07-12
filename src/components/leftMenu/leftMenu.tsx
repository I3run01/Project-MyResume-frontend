import { useSelector } from 'react-redux'
import { LeftMenuDiv } from './leftMenu.module'
import { RootState } from '@/redux/store'
import { changeTheme } from '@/redux/slice/themeSlice'
import { useDispatch } from 'react-redux'

export const LeftMenu = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const dispatch = useDispatch()

    return (
        <LeftMenuDiv
        isDark = {isDark}
        >
            <div className='options'>
                <div className='openAndCloseMenuButton'>

                </div>
                
                <div>Resume</div>
                <div>Skills</div>
                <div>Experience</div>
                <div>Projects</div>
            </div>
            <div className='settings' onClick={() => dispatch(changeTheme())}>
                <p>change theme</p>
            </div>
        </LeftMenuDiv>
    )
}