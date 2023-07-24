import { DashboardLayout } from  '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { CreateCvDiv } from '@/styles/createCv.module'
import { useSelector } from 'react-redux'
import { Loading } from '@/components/loading'

const CreateCv = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    

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
        />
    )
}

export default CreateCv