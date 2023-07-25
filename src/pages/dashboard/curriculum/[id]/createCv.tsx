import { DashboardLayout } from  '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { CreateCvDiv } from '@/styles/createCv.module'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Loading } from '@/components/loading'
import { useQuery } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { useEffect } from 'react'

const CreateCv = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()
    const { id } = router.query;

    const {data, error} = useQuery( ['getSpecifCv'], async () => {
        const response = await new Cvs().getSperificCv(id as string)
        const json = JSON.parse(response)

        return json
    })

    useEffect(() => {
        if(!data) return

        console.log(data)
    }, [data])


    return (
        <DashboardLayout
            main={
                <>
                
                    <CreateCvDiv isDark={isDark}>
                        <h1>Genegate CV</h1>

                        <div className='createCv'>
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