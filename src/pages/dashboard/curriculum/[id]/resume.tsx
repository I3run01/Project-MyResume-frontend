import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import TextArea from '@/components/textArea/textArea'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const Resume = () => {
    const [resume, setResume] = useState<string>('')
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.user);
    const { id } = router.query;

    useEffect(() => {
        if(!user) router.push('/middlewarePage')
    }, [])

    useEffect(() => {
        //TODO: send resume to database
    }, [resume])

    return (
        <DashboardLayout
            main={
                <div id="resume" className="steps">
                        <div className='resume'>
                            <h1>Resume</h1>
                            <h2>Write here a RESUME of your career</h2><br />
                            <TextArea
                                // TODO: put the text received from db
                                initialTXT={''}
                                onDataReceived={setResume}
                            />
                        </div>

                        <div className='objective'>
                            <h1>Write here your OBJECTIVES</h1><br />
                            <TextArea
                            // TODO: put the text received from db
                                initialTXT={''}
                            />
                        </div>
                </div>
            }

            nextRouter={`../${id}/skills`}
            previousRouter={`../${id}/social-medias`}
        />
    )
}

export default Resume