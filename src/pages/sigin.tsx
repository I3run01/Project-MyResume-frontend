import { SigninDiv } from '../../styles/Signin.module'
import { useState } from 'react'
import { Auth } from '../../Auth/request'
import { useRouter } from 'next/router';
import { GoogleButton } from '../../components/googlesButton'
import { Loading } from '../../components/loading'
import Link from 'next/link'
import Image from 'next/image'
import backButton from '../../../public/images/icons/backButton.svg'

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoanding] = useState<boolean>(false)
    const router = useRouter()

    const signinRequest = async () => {

        try {
            let response = JSON.parse(await new Auth().signIn(email, password))
            
            if (response.status == 200) {
                return router.push('/dashboard')
            } 
        } catch (err: any) {
            setIsLoanding(false)

            if(err.data?.message) return alert(err.data.message)

            else if(err.message) return alert(err.message)

            else return alert('Something wrong happened')
        }
    }

    return (
        <>
            {isLoading === true && <Loading/>}
        
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

                    <div id='submit' onClick={signinRequest}>Submit</div>

                    <p id='forgetPassword' onClick={() => (router.push('/forgot-password'))}>I forgot my password</p>
                    
                    <GoogleButton/>
                </form>
            </SigninDiv>
        </>
    )
}

export default SignIn