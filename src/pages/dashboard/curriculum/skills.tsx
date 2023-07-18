import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import TextArea from '@/components/textArea/textArea'
import { useEffect, useState } from 'react'

const Skills = () => {
    const [resume, setResume] = useState<string>('')

    useEffect(() => {
        //TODO: send resume to database
    }, [resume])

    return (
        <DashboardLayout
            main={
                <>
                    <h1>Academic formation</h1>
                    <input type="text" placeholder='Trainnning area'/>
                    <input type="text" placeholder='Education institution'/>
                    <input type="text" placeholder='Year of graduation'/>
                    
                </>
            }

            nextRouter='./#'
            previousRouter='./resume'
        />
    )
}

export default Skills