import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchUser } from '@/redux/slice/userSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TopMenuDiv } from './topMenuDiv.module'
import { changeTheme } from '@/redux/slice/themeSlice';
import { useTranslation } from 'react-i18next';

export const TopMenu = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const user = useSelector((state: RootState) => state.user.user);
    const [theme, setTheme] = useState('');
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        setTheme(isDark ? `${t('light')}` : `${t('dark')}`); 
    }, [isDark]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        if (typeof window !== 'undefined') {
          localStorage.setItem('i18nextLng', lng);
        }
      };

    return (
        <TopMenuDiv
            isDark={isDark}
        >
            <div id='topMenuContainer'>
                <div className='leftContainer'>
                    <div className='theme' onClick={() => dispatch(changeTheme())}>
                        {theme}
                    </div>
                    <div onClick={() => changeLanguage('pt')}>
                        pt-br
                    </div>
                    <div onClick={() => changeLanguage('en')}>
                        en-us
                    </div>
                    <div onClick={() => changeLanguage('es')}>
                        es-sa
                    </div>
                </div>
                <div className='options'>
                    {!user &&
                        <>
                            <div className='signin'>
                                <Link href={'/signin'}>{t('sign_in')}</Link>
                            </div>
                            <div className='signup'>
                                <Link href={'/signup'}>{t('sign_up')} {user}</Link>
                            </div>
                        </>
                    }
                    {user &&
                        <>
                            <div className='dashboard'>
                                <Link href={'/dashboard'}>Dashboard</Link>
                            </div>
                        </>
                    }

                </div>
            </div>
        </TopMenuDiv>
    );
}
