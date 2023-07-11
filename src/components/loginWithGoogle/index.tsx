import { GoogleButtonStyled } from './styled'
import { useGoogleLogin} from '@react-oauth/google';
import { useEffect, useState } from 'react'
import { Auth } from '../../Auth/request'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import { changeUser } from '../../redux/slice/userSlice';
import { Loading } from '../../components/loading'
import GoogleLogo from '../../../public/images/icons/googleLogo.svg'
import Image from 'next/image'


export const GoogleButton = () => {
    const [ user, setUser ] = useState<any>();
    const [isLoading, setIsLoanding] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: (codeResponse: any) => setUser(codeResponse),
        onError: (error: unknown) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        userRequest()
    }, [user])

    const userRequest = async () => {
        if(!user) return
        
        setIsLoanding(true)
        try {
            let response = JSON.parse(await new Auth().googleSignIn(user.access_token))
            
            setIsLoanding(false)

            return router.push('/')
        } catch (err: any) {
            setIsLoanding(false)
            
            if (err.data?.message) return alert(err.data?.message)

            else if (err.message) return alert(err.message)

            alert('something wrong happened')

        }     
    }

    return (
        <>
            {isLoading && <Loading/>}

            <GoogleButtonStyled onClick={() => login()}>
                <Image
                    src={GoogleLogo}
                    alt='logo of google'

                    className='googleLogo'
                />
                <p>Continue with google</p>
            </GoogleButtonStyled>  
        </>
    )
}