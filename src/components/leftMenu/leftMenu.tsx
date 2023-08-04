import { useSelector } from 'react-redux'
import { LeftMenuDiv } from './leftMenu.module'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next';

export const LeftMenu = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()
    const { t } = useTranslation();

    return (
        <LeftMenuDiv
        isDark = {isDark}
        >
            <div className='options'>         
                <div onClick={() => router.push('/dashboard/curriculum')}>{t("curriculum")}</div>
                <div onClick={() => router.push('/dashboard/project')}>{t("project")}</div>
            </div>
            <div className='settings' onClick={() => router.push('/settings')}>
                <p>{t("settings")}</p>
            </div>
        </LeftMenuDiv>
    )
}