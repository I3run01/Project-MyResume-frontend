import { ResetPasswordDiv } from '@/styles/reset-password.module'
import { useEffect, useState } from 'react'
import { User } from '@/requests/user'
import { Loading } from '../../../components/loading'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import backButton from '../../../../public/images/icons/backButton.svg'
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { changeUser } from '@/redux/slice/userSlice'

const ResetPassword = () => {
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPasswordPassword] = useState<string>('')
    const [mathPassword, setMatchPassword] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const { token } = router.query

    const { data, error, refetch, isFetching } = useQuery(['signin'], async () => {
        if(!token || !mathPassword) return

        let response = await new User().resetPassword(password, token as string)
        let json = JSON.parse(response)
        return json
        },
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if(!data) return
        dispatch(changeUser(data))
        router.push('./dashboard')
    }, [data])

    useEffect(() => {
        if(!error) return
        alert(error)
    }, [error])

    useEffect(() => {
        if(password === repeatPassword && password) setMatchPassword(true)
        else setMatchPassword(false)
    }, [password, repeatPassword])


    return (
        <>
            {isFetching && <Loading/>}
        
            <ResetPasswordDiv
                mathPassword={mathPassword}
            >
                <form id='container'>
                    <Link href={'/signin'} className='backButton'>
                        <Image
                            src={backButton}
                            alt='back button' 
                        />
                    </Link>

                    <input type="password" placeholder='new password' name='Password'
                    onChange={(event)=>{setPassword(event.target.value)}}/>
                    <p className='mathPassword'>{mathPassword ? "Password match" : "Passwords do not match"}</p>

                    <input type="password" placeholder='repeat the password' name='repeatPassword'
                    onChange={(event)=>{setRepeatPasswordPassword(event.target.value)}}/>

                    <p className='mathPassword'>{mathPassword ? "Password match" : "Passwords do not match"}</p>

                    { token &&
                        <div id='submit' onClick={() => refetch()}>Submit</div>
                    }
                </form>
            </ResetPasswordDiv>
        </>
    )
}

export default ResetPassword