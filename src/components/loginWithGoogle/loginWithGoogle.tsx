import { GoogleButtonDiv } from './loginWithGoogle.module'
import { useGoogleLogin} from '@react-oauth/google';
import { useEffect, useState } from 'react'
import { User } from '@/requests/user'
import { useRouter } from 'next/router';
import GoogleLogo from '../../../public/images/icons/googleLogo.svg'
import Image from 'next/image'

export const GoogleButton = () => {
    const [ user, setUser ] = useState<any>();
    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: (codeResponse: any) => setUser(codeResponse),
        onError: (error: unknown) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        userRequest()
    }, [user])

    const userRequest = async () => {
        if(!user) return
    
        try {
            let response = JSON.parse(await new User().googleSignIn(user.access_token))
            return router.push('/dashboard')
        } catch (err: any) {          
            if (err.data?.message) return alert(err.data?.message)

            else if (err.message) return alert(err.message)

            alert('something wrong happened')

        }     
    }

    return (
        <GoogleButtonDiv onClick={() => login()}>
            <Image
                src={GoogleLogo}
                alt='logo of google'

                className='googleLogo'
            />
            <p>Continue with google</p>
        </GoogleButtonDiv>  
        
    )
}