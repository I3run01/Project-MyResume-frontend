import { useSelector } from 'react-redux'
import { LeftMenuDiv } from './leftMenu.module'
import { RootState } from '@/redux/store'
import { changeTheme } from '@/redux/slice/themeSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const LeftMenu = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const dispatch = useDispatch()
    const [menuIsOpened, setMenuIsOpened] = useState<boolean>(true)

    return (
        <LeftMenuDiv
        isDark = {isDark}
        >
            <div className='options'>         
                <div>Curriculum</div>
                <div>Project</div>
            </div>
            <div className='settings' onClick={() => dispatch(changeTheme())}>
                <p>change theme</p>
            </div>
        </LeftMenuDiv>
    )
}