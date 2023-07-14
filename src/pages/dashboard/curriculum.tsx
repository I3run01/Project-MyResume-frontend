import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/layouts/dashboardLayout/dashboardLayout"
import { ResumeDiv } from '@/styles/resume.module'
import TextArea from '@/components/textArea/textArea'

const Resume = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    const [resume, setResume] = useState<string>('') 

    useEffect(() => {
        if(!user) router.push('../middlewarePage')
    }, [])

    useEffect(() => {
        if(!resume) return

        //TODO: put the resume in a redux and upload the file in the database
    }, [resume])
    
    return (
        <DashboardLayout>
            <ResumeDiv
                isDark = {isDark}
            >
                <h1>Curriculum</h1>

                <div className="content">
                    <div id="resume">
                        <TextArea
                            //TODO: when we connect the db, the initialTXT will be the text from the database
                            initialTXT={''}
                            onDataReceived={setResume}
                        />
                    </div>
                </div>

            </ResumeDiv>
        </DashboardLayout>
    )
}

export default Resume