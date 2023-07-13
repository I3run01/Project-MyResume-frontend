import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/layouts/dashboardLayout/dashboardLayout"
import { ResumeDiv } from '@/styles/resume.module'

const Resume = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()


    useEffect(() => {
        if(!user) router.push('../middlewarePage')
    }, [])
    
    return (
        <DashboardLayout>
            <ResumeDiv
                isDark = {isDark}
            >
                <h1>Resume</h1>
            </ResumeDiv>
        </DashboardLayout>
    )
}

export default Resume