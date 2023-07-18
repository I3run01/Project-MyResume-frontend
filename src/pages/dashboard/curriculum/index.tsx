import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/layouts/dashboardLayout/dashboardLayout"
import { ResumeDiv } from '@/styles/curriculum.module'
import Resume from '@/components/Resume/textArea'
import PersonalDatas from '@/components/personalDatas/personalDatas'
import SocialMedias from '@/components/socialMedias/socialMedias'

const Curriculum = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('../middlewarePage')
    }, [user])

    return (
        <DashboardLayout
            main={
                <ResumeDiv
                isDark = {isDark}
                >
                <h1>Curriculum</h1>

                <div className="content">

                    <div id="personalDatas" className="steps">
                        <h2>Personal datas</h2><br />
                        <PersonalDatas/>
                    </div>

                    <div id="personalDatas" className="steps">
                        <h2>social medias</h2><br />

                        <SocialMedias/>
                    </div>
                    
                    <div id="resume" className="steps">
                        <h2>Write here a RESUME of your career</h2><br />
                        <Resume
                            initialTXT={''}
                        />
                    </div>
                </div>
            </ResumeDiv>
            }
        />
    )
}

export default Curriculum
