import { SigninDiv } from '@/styles/signin.module'
import { useState, useEffect } from 'react'
import { User } from '@/requests/user'
import { useRouter } from 'next/router';
import { GoogleButton } from '@/components/loginWithGoogle/loginWithGoogle'
import Link from 'next/link'
import Image from 'next/image'
import backButton from '.././../public/images/icons/backButton.svg'
import { useQuery } from 'react-query';
import { Loading } from '@/components/loading'

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    const { data, error, refetch, isFetching } = useQuery(['signin'], async () => {
        let response = await new User().signIn(email, password)
        let json = JSON.parse(response)
        return json
        },
        {
            enabled: false,
        }
    );

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

            <SigninDiv>
                <form id='container'>
                    <Link href={'/'} className='backButton'>
                        <Image
                            src={backButton}
                            alt='back button' 
                        />
                    </Link>

                    <input type="text" placeholder='Email' name='Email'
                    onChange={(event)=>{setEmail(event.target.value)}}/>

                    <input type="password" placeholder='Password' 
                    onChange={(event)=>{setPassword(event.target.value)}}/>

                    <div id='submit' onClick={() => refetch()}>Submit</div>

                    <p id='forgetPassword' onClick={() => (router.push('/forgot-password'))}>I forgot my password</p>
                    
                    <GoogleButton/>
                </form>
            </SigninDiv>
        </>
    )
}

export default SignIn