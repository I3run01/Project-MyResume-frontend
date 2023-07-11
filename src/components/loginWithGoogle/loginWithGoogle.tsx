import { GoogleButtonDiv } from './loginWithGoogle.module'
import { useGoogleLogin} from '@react-oauth/google';
import { useEffect, useState } from 'react'
import { User } from '@/requests/user'
import { useRouter } from 'next/router';
import GoogleLogo from '../../../public/images/icons/googleLogo.svg'
import Image from 'next/image'
import { useQuery } from 'react-query';
import { Loading } from '@/components/loading'

export const GoogleButton = () => {
    const [ user, setUser ] = useState<any>();
    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: (codeResponse: any) => setUser(codeResponse),
        onError: (error: unknown) => console.log('Login Failed:', error)
    });

    const { data, error, refetch, isFetching } = useQuery(['googleLogin'], async () => {

        let response = await new User().googleSignIn(user.access_token)
        let json = JSON.parse(response)
        return json
        },
        {
            enabled: false,
        }
    );
    
    useEffect(() => {
        if(!user) return
        refetch()
    }, [user])

    useEffect(() => {
        if(!data) return
        router.push('./dashboard')
    }, [data])

    useEffect(() => {
        if(!error) return
        alert(error)
    }, [error])

    return (
        <>
            {isFetching && <Loading/>}
            
            <GoogleButtonDiv onClick={() => login()}>
                <Image
                    src={GoogleLogo}
                    alt='logo of google'

                    className='googleLogo'
                />
                <p>Continue with google</p>
            </GoogleButtonDiv>  
        </>
        
    )
}