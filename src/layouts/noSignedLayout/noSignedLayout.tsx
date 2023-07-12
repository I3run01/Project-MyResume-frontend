import { ReactElement } from 'react';
import { TopMenu } from '@/components/topMenu/topMenu';
import { NoSignedLayoutDiv } from './noSignedLayout.module'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type props = {
    children: ReactElement
}

export const NoSignedLayout = ({children}: props) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    return (
        <NoSignedLayoutDiv isDark={isDark}>
            <TopMenu/>
            <div className='children'>
                {children}
            </div>
        </NoSignedLayoutDiv>
    )
}
