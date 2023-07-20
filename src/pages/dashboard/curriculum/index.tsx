import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CurriculumDiv } from '@/styles/curriculum.module'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'

type cvsType = {
    name: string
    _id: string
}[]

const Curriculum = () => {
    const [cvs, setCvs] = useState<cvsType>([])
    const [deleteCvId, setDeleteCvid] = useState<string>()
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    const [getCvs, newCv, deleteCv] = useQueries([
        {
          queryKey: 'getCvs',
          queryFn: async () => {
            const response = await new Cvs().getCvs();
            const json = JSON.parse(response)
            return json;
          },
        },
        {
            queryKey: 'newCv',
            queryFn: async () => {
                const response = await new Cvs().newCv()
                const json = JSON.parse(response)
                return json.data
            },
            enabled: false
        },
        {
            queryKey: ['deleteCv', deleteCvId],
            queryFn: async ({queryKey}:any) => {
                console.log(queryKey[1])
                const response = await new Cvs().deleteCv(queryKey[1])
                const json = JSON.parse(response)
                return json.data
            },
            enabled: false
        }
    ])

    useEffect(() => {
        if(!user) router.push('../middlewarePage')
    }, [])

    useEffect(() => {
        deleteCv.refetch()
    }, [deleteCvId])
    
    useEffect(() => {
        if(!getCvs.data) return

        console.log(getCvs.data)

        setCvs(getCvs.data)
    }, [getCvs.data])

    useEffect(() => {
        //TODO: send the new name to db
    }, [cvs])

    const changeCvName = (index: number, name: string) => {
        const newCv = [...cvs]

        newCv[index].name = name
        setCvs(newCv)
    }

    const deleteCvState = (cvId: number) => {
        // TODO: should delete the cv in cvs state of the _id is equal to cvId
    }

    return (
        <DashboardLayout
            main={
                <CurriculumDiv isDark={isDark}>
                    <p className='text'>
                        Those are your CVs. Please <b>double-click to open it</b>, or <b>single-click to edit its name.</b>
                    </p>

                    {cvs.map((cv, index) => (
                        <div key={cv._id} className='cvsNamesContainer'>
                            <input 
                                type="" value={cv.name} 
                                onChange={(e) => changeCvName(index, e.target.value)}
                                className='Cvs'
                                onDoubleClick={() => router.push(`./curriculum/${cv._id}/personal-datas`)}
                            />
                            <div className='deleteButton'
                                onClick={()=> setDeleteCvid(cv._id)}
                            >
                                delete
                            </div>
                        </div>
                    ))}

                    <div className='newCV' onClick={() => newCv.refetch()}>
                        create a new cv
                    </div>

                </CurriculumDiv>
            }
        />
    )
}

export default Curriculum
