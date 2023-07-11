import { useEffect, useState } from 'react'
import { User } from '@/requests/user'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styled from 'styled-components'
import { Loading } from '@/components/loading'

const Container = styled.div<{isDark: boolean}>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props => props.isDark ? 'black' : 'white'};
`;

const EmailConfirmation = () => {
    const router = useRouter()
    const isDark = useSelector((state: RootState) => state.theme.isDark )
    const { token } = router.query

    const { data, error, isFetching } = useQuery(['corfirm-email'], async () => {
        let response = await new User().confirmationEmail(token as string)
        let json = JSON.parse(response)
        return json
        },
        {
            enabled: !token,
        }
    );

    if(isFetching) {
        return <Loading/>
    }

    useEffect(() => {
        if(!data) return
        router.push('./dashboard')
    }, [data])

    useEffect(() => {
        if(!error) return
        alert(error)
    }, [error])

   return <Container isDark={isDark}/>
}

export default EmailConfirmation