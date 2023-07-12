import { useState, useEffect } from 'react'
import { User } from '@/requests/user'
import { Loading } from '@/components/loading'
import Link from 'next/link'
import Image from 'next/image'
import backButton from '../../public/images/icons/backButton.svg'
import { useQuery } from 'react-query';
import { ForgotPasswordDiv } from '@/styles/forgot-password.module'

const SignIn = () => {
    const [email, setEmail] = useState<string>('')

    const { data, error, refetch, isFetching } = useQuery(['signin'], async () => {
        let response = await new User().forgotPassword(email)
        let json = JSON.parse(response)
        return json
        },
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if(!data) return
        alert('A link to reset password has been sent to your inbox.')
    }, [data])

    useEffect(() => {
        if(!error) return
        alert(error)
    }, [error])

    return (
        <>
            {isFetching && <Loading/>}
            
            <ForgotPasswordDiv>
                <form id='container'>
                    <Link href={'/signin'} className='backButton'>
                        <Image
                            src={backButton}
                            alt='back button' 
                        />
                    </Link>

                    <input type="text" placeholder='Email' name='Email'
                    onChange={(event)=>{setEmail(event.target.value)}}/>

                    <div id='submit' onClick={() => refetch()}>Submit</div>
                </form>
            </ForgotPasswordDiv>
        </>
    )
}

export default SignIn