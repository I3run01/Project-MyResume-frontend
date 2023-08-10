import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { useEffect, useState, Fragment } from 'react'
import { Components } from '@/styles/components.module'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useQueries } from 'react-query'
import { Projects } from '@/requests/projects'
import { ProjectIdDiv } from '@/styles/projectsid.module'
import TextArea from '@/components/textArea/textArea'
import { useTranslation } from 'react-i18next';
import { ImageContent } from '@/components/projectContent/imageContent/imageContent'


const Project = () => {

    const [project, setProject] = useState<null | projectType>(null)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const { t } = useTranslation();

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
                content: [
                    {
                        title: '',
                        image: '',
                        text: ''
                    }
                ]
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

    const handleContentChanges = {
        addContent: (index: number) => {
            const content: contentImage = {
                title: '',
                image: '',
                text: ''
            }
    
            if (project) {
                const updatedProject = { ...project };

                if (index === -1) {
                    updatedProject.content.push(content);
    
                updatedProject.content.splice(index, 0, content);
    
                setProject(updatedProject);
                }    
            }
        },

        deleteContent: (index: number) => {
            if (project) {
                const updatedProject = { ...project };
    
                if (index === -1) {
                    updatedProject.content.pop();
                } else {
                    alert(index)
                    updatedProject.content.splice(index, 1);
                }
    
                setProject(updatedProject);
            }
        },

        replaceContent: (index: number, newContent: contentImage) => {
            if (project) {
                const updatedProject = { ...project };
    
                if (index === -1 || index >= updatedProject.content.length) {
                    console.error("Invalid index for replacement");
                    return;
                }
    
                updatedProject.content[index] = newContent;
    
                setProject(updatedProject);
            }
        }
    }

       

    return (
        <DashboardLayout
            main={ 
                <ProjectIdDiv>
                    <h1>Project</h1> 

                    <h2>{t('dates')}</h2>

                    <Components.label isDark={isDark}>
                        {t('start')}:
                    </Components.label>

                    <Components.Input
                        type='date'
                        value={project?.start}
                        isDark={isDark}
                    />

                    <br />

                    <Components.label isDark={isDark}>
                        {t('end')}:
                    </Components.label>

                    <Components.Input
                        type='date'
                        value={project?.end}
                        isDark={isDark}
                    />

                    <div className='textArea'>
                       <h2>{t('resume of the project')}</h2>
                        <TextArea
                            initialTXT={project?.about ? project.about : ''}
                        />
                    </div>

                    <h2>{t('content')}</h2>

                    {
                        project?.content.map((item, key) => {
                            return (
                                <>
                                    <ImageContent 
                                    key={key} 
                                    content={item} 
                                    index={key} 
                                    onDataReceived={() => {}}/>
                                
                                    <Components.DeleteButton
                                    isDark={isDark}
                                    onClick={() => handleContentChanges.deleteContent(key)}>
                                        {t("delete content")}
                                    </Components.DeleteButton>
                                </>
                            )
                        })
                    }

                    <Components.AddItemButton
                    isDark={isDark} onClick={() => handleContentChanges.addContent(-1)}>
                        {t("add new content")}
                    </Components.AddItemButton>

                </ProjectIdDiv>
            }
        />
    )
}

export default Project


