import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CurriculumDiv } from '@/styles/curriculum.module'
import { useQueries } from 'react-query'
import { Projects } from '@/requests/projects'
import { Components } from '@/styles/components.module'
import { useTranslation } from 'react-i18next';

type projectType = {
    name: string
    _id: string
}

const ProjectsIndex = () => {
    const [projects, setProjects] = useState<projectType[]>([])
    const [deleteProjectId, setDeleteProjectid] = useState<string>()
    const [projectNameChanging, setProjectNameChanging] = useState<projectType>()
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()
    const { t } = useTranslation();

    const [getProjects, newProject, deleteProject, setProjectName] = useQueries([
        {
          queryKey: 'getProjects',
          queryFn: async () => {
            const response = await new Projects().getProjects();
            const json = JSON.parse(response)
            return json;
          },
        },
        {
            queryKey: 'newProject',
            queryFn: async () => {
                const response = await new Projects().newProject()
                getProjects.refetch()
                const json = JSON.parse(response)
                return json.data
            },
            enabled: false
        },
        {
            queryKey: ['deleteProject', deleteProjectId],
            queryFn: async ({queryKey}:any) => {
                const response = await new Projects().deleteProject(queryKey[1])
                const json = JSON.parse(response)
                return json.data
            },
            enabled: false
        },
        {
            queryKey: ['changeProjectName', projectNameChanging],
            queryFn: async ({queryKey}:any) => {
                const response = await new Projects().updateProjectField(
                    'name',
                    projectNameChanging?._id as string,
                    projectNameChanging?.name
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
        if(!deleteProjectId) return

        deleteProject.refetch()
        deleteProjectState(deleteProjectId)
    }, [deleteProjectId])
    
    useEffect(() => {
        if(!getProjects.data) return
        setProjects(getProjects.data)
    }, [getProjects.data])

    useEffect(() => {
        setProjectName.refetch()
    }, [projectNameChanging])

    const changeProjectName = (index: number, name: string) => {
        const newProject = [...projects]

        newProject[index].name = name
        setProjects(newProject)

        setProjectNameChanging({name: name, _id: newProject[index]._id})
    }

    const deleteProjectState = (projectId: string) => {
        setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
    }

    const handleDeleteButton = (projectId: string) => {
        const confirmDelete = window.confirm(t("Are you sure you want to delete this Project?"));

        if (confirmDelete) {
            setDeleteProjectid(projectId);
        }
    }

    return (
        <DashboardLayout
            main={
                <CurriculumDiv isDark={isDark}>
                    <p className='text'>
                        {t("These are your projects. Please. Single-click to edit its name. Double-click to open it")}. 
                        <b> {t("curriculum_text_highlight")}</b>
                    </p>

                    {projects?.map((project, index) => (
                        <div key={project._id} className='projectsNamesContainer'>
                            <Components.Input
                                type="" value={project.name} 
                                onChange={(e: any) => changeProjectName(index, e.target.value)}
                                className='Projects'
                                onDoubleClick={() => router.push(`./projects/${project._id}`)}
                                isDark={isDark}
                            />

                            <Components.DeleteButton
                                onClick={()=> handleDeleteButton(project._id)}
                                isDark={isDark}
                                scale='80%'
                            >
                                delete
                            </Components.DeleteButton>
                            
                        </div>
                    ))}

                    <Components.AddItemButton 
                    onClick={() => newProject.refetch()} isDark={isDark}>
                        {t("create_new_project")}
                    </Components.AddItemButton>

                </CurriculumDiv>
            }
        />
    )
}

export default ProjectsIndex
