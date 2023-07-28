import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CurriculumDiv } from '@/styles/curriculum.module'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { Components } from '@/styles/components.module'

type cvType = {
    name: string
    _id: string
}

const Curriculum = () => {
    const [cvs, setCvs] = useState<cvType[]>([])
    const [deleteCvId, setDeleteCvid] = useState<string>()
    const [cvNameChanging, setCvNameChanging] = useState<cvType>()
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    const [getCvs, newCv, deleteCv, setCvName] = useQueries([
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
                getCvs.refetch()
                const json = JSON.parse(response)
                return json.data
            },
            enabled: false
        },
        {
            queryKey: ['deleteCv', deleteCvId],
            queryFn: async ({queryKey}:any) => {
                const response = await new Cvs().deleteCv(queryKey[1])
                const json = JSON.parse(response)
                return json.data
            },
            enabled: false
        },
        {
            queryKey: ['changeCvName', cvNameChanging],
            queryFn: async ({queryKey}:any) => {
                const response = await new Cvs().updateCvField(
                    'name',
                    cvNameChanging?._id as string,
                    cvNameChanging?.name
                )
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
        if(!deleteCvId) return

        deleteCv.refetch()
        deleteCvState(deleteCvId)
    }, [deleteCvId])
    
    useEffect(() => {
        if(!getCvs.data) return
        setCvs(getCvs.data)
    }, [getCvs.data])

    useEffect(() => {
        setCvName.refetch()
    }, [cvNameChanging])

    const changeCvName = (index: number, name: string) => {
        const newCv = [...cvs]

        newCv[index].name = name
        setCvs(newCv)

        setCvNameChanging({name: name, _id: newCv[index]._id})
    }

    const deleteCvState = (cvId: string) => {
        setCvs(prevCvs => prevCvs.filter(cv => cv._id !== cvId));
    }

    const handleDeleteButton = (cvId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this CV?");

        if (confirmDelete) {
            setDeleteCvid(cvId);
        }
    }

    return (
        <DashboardLayout
            main={
                <CurriculumDiv isDark={isDark}>
                    <p className='text'>
                        Those are your CVs. Please , or <b>single-click to edit its name.</b> <b>double-click to open it</b>
                    </p>

                    {cvs?.map((cv, index) => (
                        <div key={cv._id} className='cvsNamesContainer'>
                            <Components.Input
                                type="" value={cv.name} 
                                onChange={(e: any) => changeCvName(index, e.target.value)}
                                className='Cvs'
                                onDoubleClick={() => router.push(`./curriculum/${cv._id}/personal-datas`)}
                                isDark={isDark}
                            />

                            <Components.DeleteButton
                                onClick={()=> handleDeleteButton(cv._id)}
                                isDark={isDark}
                                scale='80%'
                            >
                                delete
                            </Components.DeleteButton>
                            
                        </div>
                    ))}

                    <Components.AddItemButton onClick={() => newCv.refetch()} isDark={isDark}>
                        create a new cv
                    </Components.AddItemButton>

                </CurriculumDiv>
            }
        />
    )
}

export default Curriculum
