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
import { ProjectGroup } from '@/components/projectContent/projectGroup/projectGroup'


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
                start: '2023-09-11',
                end: '2024-10-10',
                content: [
                    {
                        title: '',
                        image: '',
                        text: ''
                    }
                ],
            }

            return json;
          },
        }
    ])

    useEffect(() => {
        if(!getProject.data) return

        setProject(getProject.data)

    }, [getProject])

    const setAbout = (text: string) => updateProjectProperty('about', text)

    const updateProjectProperty = (property: "about" | "start" | "end", value: string) => {
        if (project) {
            setProject(prev => {
                if (!prev) return null;
    
                return { ...prev, [property]: value };
            });
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setProject(prevState => prevState ? { ...prevState, end: null } : null);
        } else {
            setProject(prevState => prevState ? { ...prevState, end: 'not-ended' } : null);
        }
    }
    
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
                        onChange={(e:any) => updateProjectProperty('start', e.target.value)}
                    />

                    <br />

                    <Components.label isDark={isDark}>
                        {t('end')}:
                    </Components.label>

                    { project?.end &&

                        <Components.Input
                            type='date'
                            value={project?.end}
                            isDark={isDark}
                            onChange={(e:any) => updateProjectProperty('end', e.target.value)} 
                        />
                    }

                    <br />

                    <Components.label isDark={isDark}>
                        {t('still working?')}:
                    </Components.label>

                    <input 
                    type="checkbox"
                    placeholder='still working?' 
                    className='stillWorking'
                    checked={project?.end === null}
                    onChange={handleCheckboxChange}/>

                    <div className='textArea'>
                       <h2>{t('resume of the project')}</h2>
                        <TextArea
                            initialTXT={project?.about ? project.about : ''}
                            onDataReceived={setAbout}
                            DoesNotReRenderInitialTXT={true}
                        />
                    </div>

                    <h2>{t('content')}</h2>

                    {
                        project?.content.map((item, key) => {
                            return (
                                <Fragment key={key}>
                                    <ImageContent 
                                    key={key} 
                                    content={item} 
                                    index={key} 
                                    onDataReceived={handleContentChanges.replaceContent}/>
                                
                                    <Components.DeleteButton
                                    isDark={isDark}
                                    onClick={() => handleContentChanges.deleteContent(key)}>
                                        {t("delete content")}
                                    </Components.DeleteButton>
                                </Fragment>
                            )
                        })
                    }

                    <Components.AddItemButton
                    isDark={isDark} onClick={() => handleContentChanges.addContent(-1)}>
                        {t("add new content")}
                    </Components.AddItemButton>

                    <h1>{t('groups')}</h1>

                </ProjectIdDiv>
            }
        />
    )
}

export default Project


