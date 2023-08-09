import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { useEffect, useState } from 'react'
import { Components } from '@/styles/components.module'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useQueries } from 'react-query'
import { Projects } from '@/requests/projects'
import TextArea from '@/components/textArea/textArea'

type projectType  = {
    about: string
    start: string
    end:string
    content: [any]
}

const project = {
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet fugit quaerat natus, eos, commodi explicabo atque quas eum recusandae repudiandae omnis blanditiis veritatis, nam in nemo odit consequatur obcaecati.',
    start: '10-10-2020',
    end: '10-10-2023',
    constent: [

    ]
}

const Project = () => {

    const [project, setProject] = useState<null | projectType>(null)
    const isDark = useSelector((state: RootState) => state.theme.isDark)

    const [getProject] = useQueries([
        {
          queryKey: 'getProject',
          queryFn: async () => {
            // const response = await new Projects().getProjects();
            // const json = JSON.parse(response)

            const json: projectType = {
                about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet fugit quaerat natus, eos, commodi explicabo atque quas eum recusandae repudiandae omnis blanditiis veritatis, nam in nemo odit consequatur obcaecati.',
                start: '2023-9-11',
                end: '2024-10-10',
                content: [{}]
            }

            return json;
          },
        }
    ])

    useEffect(() => {
        if(!getProject.data) return

        setProject(getProject.data)

        console.log(getProject)

    }, [getProject])

    return (
        <DashboardLayout
            main={
                <>
                    <h1>Project</h1>   

                    <Components.Input
                        type='date'
                        value={project?.start}
                        isDark={isDark}
                    />

                    <Components.Input
                        type='date'
                        value={project?.end}
                        isDark={isDark}
                    />

                    <TextArea
                        initialTXT={project?.about as string}
                    />

                    <Components.paragraph
                    isDark={isDark}>
                        
                    </Components.paragraph>
                        

                    
        
                </>
            }
        />
    )
}

export default Project


