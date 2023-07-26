import { DashboardLayout } from  '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { CreateCvDiv } from '@/styles/createCv.module'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Loading } from '@/components/loading'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { WordCv } from '@/requests/wordCv'
import { useEffect, useState } from 'react'

const CreateCv = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const user = useSelector((state: RootState) => state.user.user)
    const router = useRouter()
    const [cvDatas, setCvDatas] = useState<Object | null>(null)
    const { id } = router.query;
    
    const [getSperificCv, createWordCv] = useQueries([
        {
            queryKey: 'getSpecifCv',
            queryFn: async () => {

                const response = await new Cvs().getSperificCv(id as string)
                const json = JSON.parse(response)

                return json
            },
        },
        {
            queryKey: 'create-word-cv',
            queryFn: async () => {

                if(!cvDatas) return

                const response = await new WordCv().CreateCv(cvDatas)
                return {"status": "success"}
            }, enabled: false
        },
    ])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')
    }, [])

    useEffect(() => {
        if(!getSperificCv.data) return

        setCvDatas(getSperificCv.data)
    }, [getSperificCv.data])

    useEffect(() => {
        if(!createWordCv.error) return

        alert(createWordCv.error)
    }, [createWordCv.error])

    return (
        <DashboardLayout
            main={
                <>
                
                    <CreateCvDiv isDark={isDark}>
                        <h1>Genegate CV</h1>

                        <div className='createCv' onClick={() => createWordCv.refetch()}>
                            <p>
                                Click here to generate CV
                            </p>
                        </div>
                    </CreateCvDiv>
                </>
            }

            previousRouter={`../${id}/experience`}
        />
    )
}

export default CreateCv