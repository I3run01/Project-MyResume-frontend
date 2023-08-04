import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import TextArea from '@/components/textArea/textArea'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { Loading } from '@/components/loading'
import { Components } from '@/styles/components.module'
import { useTranslation } from 'react-i18next';

const Resume = () => {
    const [resume, setResume] = useState<string | null>(null)
    const [cvTitle, setCvTitle] = useState<string | null>(null)
    const [objectives, setObjectives] = useState<string | null>(null)
    const [initialResume, setInitialResume] = useState<string>('')
    const [initialObjectives, setInitialObjectives] = useState<string>('')
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.user);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const { id } = router.query;
    const { t } = useTranslation();

    const [resumeQuery, objectivesQuery, sendResume, sendObjectives, cvTitleQuery, sendCvTitle] = useQueries([
        {
          queryKey: 'resumeQuery',
          queryFn: async () => {
            const response = await new Cvs().getSpecifFieldOfASpecificCv(
                "resume", 
                id as string, 
            )

            const json = JSON.parse(response)
            return json

          }
        },
        {
            queryKey: 'objectivesQuery',
            queryFn: async () => {
              const response = await new Cvs().getSpecifFieldOfASpecificCv(
                  "objectives", 
                  id as string, 
              )
  
              const json = JSON.parse(response)
              console.log(json)
              return json
  
            }
        },
        {
        queryKey: 'sendResume',
        queryFn: async () => {
            if(!resume) return

            const response = await new Cvs().updateCvField(
                "resume", 
                id as string, 
                resume
            )

            const json = JSON.parse(response)
            return json

        }, 
        enabled: false
        },
        {
            queryKey: 'sendObjectives',
            queryFn: async () => {
                if(!objectives) return

                const response = await new Cvs().updateCvField(
                    "objectives", 
                    id as string, 
                    objectives
                )

                const json = JSON.parse(response)
                return json

            }, 
            enabled: false
        },
        {
            queryKey: 'cvTitleQuery',
            queryFn: async () => {
              const response = await new Cvs().getSpecifFieldOfASpecificCv(
                  "cvTitle", 
                  id as string, 
              )
  
              const json = JSON.parse(response)
              return json
  
            },
        },
        {
            queryKey: 'sendCvTitle',
            queryFn: async () => {
                if(cvTitle === null) return

                const response = await new Cvs().updateCvField(
                    "cvTitle", 
                    id as string, 
                    cvTitle
                )

                const json = JSON.parse(response)
                return json

            }, 
            enabled: false
        },       
])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')
    }, [])

    useEffect(() => {
       if(!resumeQuery.data) return

       setInitialResume(String(resumeQuery.data))

    }, [resumeQuery.data])

    useEffect(() => {
        if(!cvTitleQuery.data) return
 
        setCvTitle(String(cvTitleQuery.data))
 
     }, [cvTitleQuery.data])

    useEffect(() => {
        if(!objectivesQuery.data) return
 
        setInitialObjectives(String(objectivesQuery.data))
 
     }, [objectivesQuery.data])

    useEffect(() => {
        sendResume.refetch()
    }, [resume])

    useEffect(() => {
        sendObjectives.refetch()
    }, [objectives])

    useEffect(() => {
        sendCvTitle.refetch()
    }, [objectives])

    return (
        <DashboardLayout
            main={
                <>
                    { (resumeQuery.isLoading || objectivesQuery.isLoading)  && 
                        <Loading/> 
                    }
                    <div id="resume" className="steps">
                            <h1>{t("resume")}</h1>

                            <div>
                                <h2>{t("cv_title")}</h2>
                                <Components.Input
                                    type="text" 
                                    value={cvTitle ? cvTitle : ''} 
                                    onChange={(e: any) => setCvTitle(e.target.value)}
                                    isDark={isDark}
                                    width='800px'
                                />

                            </div>

                            <div className='resume'>
                                <h2>{t("write_resume")}</h2>
                                <TextArea
                                    initialTXT={initialResume}
                                    onDataReceived={setResume}
                                />
                            </div>

                            <div className='objective'>
                                <h2>{t("write_objectives")}</h2><br />
                                <TextArea
                                    initialTXT={initialObjectives}
                                    onDataReceived={setObjectives}
                                />
                            </div>
                    </div>
                </>
            }

            nextRouter={`../${id}/skills`}
            previousRouter={`../${id}/social-medias`}
        />
    )
}

export default Resume