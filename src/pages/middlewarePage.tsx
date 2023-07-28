import { fetchUser } from '@/redux/slice/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store';
import { Loading } from '@/components/loading';
import styled from 'styled-components';

const StyledDiv = styled.div<{ isDark: boolean }>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${({ isDark }) => (isDark ? '#0f0f0f' : '#cfcfcf')};
`;

const MiddlewarePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const userRequest = useSelector((state: RootState) => state.user.requestState);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        if(!userRequest) return
        console.log(user)
    
        const middleware = async () => {
            if(user) router.back();
            router.push('./signin');
        }
        middleware();
    }, [userRequest]);

    return (
        <StyledDiv isDark={isDark}>
            <Loading/>
        </StyledDiv>
    )
}

export default MiddlewarePage;
