import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import TextArea from '@/components/textArea/textArea'
import { useEffect, useState } from 'react'

const Resume = () => {
    const [resume, setResume] = useState<string>('')

    useEffect(() => {
        //TODO: send resume to database
    }, [resume])

    return (
        <DashboardLayout
            main={
                <div id="resume" className="steps">
                        <div className='resume'>
                            <h1>Write here a RESUME of your career</h1><br />
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

            nextRouter='./skills'
            previousRouter='./social-medias'
        />
    )
}

export default Resume