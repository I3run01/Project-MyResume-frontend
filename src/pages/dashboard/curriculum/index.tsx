import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CurriculumDiv } from '@/styles/curriculum.module'

type cvsType = {
    name: string
    _id: string
}[]

const curriculums: cvsType = [
    {
        name: 'cv in portuguese',
        _id: 'id_01'
    },
    {
        name: 'cv in english',
        _id: 'id_02'
    }
]

const Curriculum = () => {
    const [cvs, setCvs] = useState<cvsType>([])
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('../middlewarePage')
    }, [])

    useEffect(() => {
        //TODO: request the cvs from db
        setCvs(curriculums)
    }, [])

    useEffect(() => {
        //TODO: send the new name to db
    }, [cvs])

    const changeCvName = (index: number, name: string) => {
        const newCv = [...cvs]

        newCv[index].name = name
        setCvs(newCv)
    }

    return (
        <DashboardLayout
            main={
                <CurriculumDiv isDark={isDark}>
                    <p className='text'>Those are your CVs. Please <b>double-click to open it</b>, or <b>single-click to edit its name.</b></p>
                    {cvs.map((cv, index) => (
                        <div key={cv._id}>
                            <input 
                                type="" value={cv.name} 
                                onChange={(e) => changeCvName(index, e.target.value)}
                                className='Cvs'
                                onDoubleClick={() => router.push(`./curriculum/${cv._id}/personal-datas`)}
                            />
                        </div>
                    ))}
                </CurriculumDiv>
            }
        />
    )
}

export default Curriculum
