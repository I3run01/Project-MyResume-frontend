import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { ExperienceDiv } from '@/styles/experience.module'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextArea from '@/components/textArea/textArea'

type experienceType = {
    business: string
    jobName: string,
    date: string,
    jobResume: string
    duties: string[]
    achievements: string[]
    appliedTechnologies: string[]
}

const Experience = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)

    const [experiences, setExperience] = useState<experienceType[]>([])

    useEffect(() => {
        console.log(experiences)
    }, [experiences])

    const handleGlobalExperience = {
        handleJobNameChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newExperience = [...experiences];
            newExperience[key].jobName = e.target.value;
            setExperience(newExperience);
        },
    
        handleBusinessNameChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newExperience = [...experiences];
            newExperience[key].business = e.target.value;
            setExperience(newExperience);
        },
    
        handleDateChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newExperience = [...experiences];
            newExperience[key].date = e.target.value;
            setExperience(newExperience);
        },
    
        handleResumeChange: (text: string, index?: number) => {
            if(index === undefined) return;
    
            const newExperience = [...experiences];
            newExperience[index].jobResume = text;
            setExperience(newExperience);
        },
    
        addExperience: () => {
            setExperience(prevState => [...prevState, {
                business: '',
                jobName: '',
                jobResume: '',
                duties:  [''],
                achievements: [''],
                appliedTechnologies: [''],
                date: ''
    
            }]);
        },
    
        deleteExperience: (key: number) => {
            setExperience(prevState => prevState.filter((item, index) => index !== key));
        }
    }

    

 
    return (
        <DashboardLayout
            main={
                <ExperienceDiv isDark={isDark}>
                    <h1>Experience</h1>

                    {
                        experiences.map((experience, key ) => {
                            return (
                                <div key={key} className='container'>
                                    <div className='jobInfo'>
                                        <input 
                                            type="text" 
                                            className='jobName' 
                                            value={experience.jobName}
                                            onChange={(e) => handleGlobalExperience.handleJobNameChange(e, key)}
                                            placeholder='job name'
                                        />

                                        <input 
                                            type="text" 
                                            className='businessName' 
                                            value={experience.business}
                                            onChange={(e) => handleGlobalExperience.handleBusinessNameChange(e, key)}
                                            placeholder='business name'
                                        />

                                        <input 
                                            type="text" 
                                            className='date' 
                                            value={experience.date}
                                            onChange={(e) => handleGlobalExperience.handleDateChange(e, key)}
                                            placeholder='working date - ex: 05/18 to 02/21 or 05/18 to today'
                                        />
                                    </div>

                                    <br />

                                    <div className='Resume'>
                                        <h2>Write a RESUME of what you did at work.</h2>
                                        <br />
                                        <TextArea
                                            //TODO: put the initial text from db here
                                            initialTXT=''
                                            index={key}
                                            onDataReceived={handleGlobalExperience.handleResumeChange}
                                        />
                                    </div>

                                    <br />

                                    <div className='Duties'>
                                        <h2>DUTIES, use one line for each duty</h2>

                                        <div className='dutiesContainer'>

                                            {
                                                experience.duties.map((duty, key) => {
                                                    return (
                                                        <div>
                                                            <input 
                                                                type="text" 
                                                                value={duty}
                                                                placeholder='write a duty here'
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div className='deleteButton deleteDuty'>
                                                Delete
                                            </div>

                                            <div className='addItem addDuty'>
                                                add duty
                                            </div>

                                        </div>
        
                                    </div>

                                    <br />

                                    <div onClick={() => handleGlobalExperience.deleteExperience(key)} className='deleteButton'>
                                        Delete
                                    </div>

                                </div>
                            )
                        })
                    }

                    <div className='addItem' onClick={handleGlobalExperience.addExperience}>
                        Add experience
                    </div>

                </ExperienceDiv>
            }

            previousRouter='./skills'
        />
    )
}

export default Experience