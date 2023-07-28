import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { ExperienceDiv } from '@/styles/experience.module'
import { ExperienceContainerDiv } from '@/styles/experience.module'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextArea from '@/components/textArea/textArea'
import { useRouter } from 'next/router'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { Loading } from '@/components/loading'

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
    const router = useRouter()
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const user = useSelector((state: RootState) => state.user.user);
    const { id } = router.query;

    const [experiences, setExperience] = useState<experienceType[] | null>(null)
    const [closedExperienceIndex, setClosetExperienceIndex] = useState<number[]>(() => {
        if (typeof window !== 'undefined') {
            const savedIndex = window.localStorage.getItem(`closedExperienceIndex${id}`);
            return savedIndex ? JSON.parse(savedIndex) : [];
        }
        return [];
    });

    
    const [expericenceQuery, sendExperices] = useQueries([
        {
            queryKey: 'getExperience',
            queryFn: async () => {

                const response = await new Cvs().getSpecifFieldOfASpecificCv(
                    "experinces",
                    id as string,
                )

                const json = JSON.parse(response)

                return json
            }, enabled: false
        },
        {
            queryKey: 'sendExperience',
            queryFn: async () => {
                if(experiences == null) return

                const response = await new Cvs().updateCvField(
                    "experinces",
                    id as string,
                    experiences
                )

                const json = JSON.parse(response)

                return json
            },
        },
    ])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')

        expericenceQuery.refetch()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(`closedExperienceIndex${id}`, JSON.stringify(closedExperienceIndex));
        }
    }, [closedExperienceIndex]);

    useEffect(() => {
        if(!expericenceQuery.data) return

        setExperience(expericenceQuery.data)
    }, [expericenceQuery.data])

    useEffect(() => {
        if(!experiences) return

        sendExperices.refetch()
    }, [experiences])

    const closeOrOpenExperienceDiv = (index: number) => {
        setClosetExperienceIndex(prevIndex => {
            // Check if the index is already in the array
            const foundIndex = prevIndex.indexOf(index);
    
            if (foundIndex !== -1) {
                // If the index is found, remove it from the array
                return prevIndex.filter(item => item !== index);
            } else {
                // If the index is not found, add it to the array
                return [...prevIndex, index];
            }
        });
    }

    const dragHandlers = {
        handleDragStart: (index: number, e: React.DragEvent) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", index.toString());
        },
    
        handleDrop: (dropIndex: number, e: React.DragEvent) => {
            e.preventDefault();
            const dragIndex = parseInt(e.dataTransfer.getData("text"));
            if (experiences) {
                const dragItem = experiences[dragIndex];
                const newExperiences = [...experiences];
                newExperiences[dragIndex] = newExperiences[dropIndex];
                newExperiences[dropIndex] = dragItem;
                setExperience(newExperiences);
            }
        },
    
        handleDragOver: (e: React.DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        }
    } 

    const handleGlobalExperience = {
        handleJobNameChange: (e: React.ChangeEvent<HTMLInputElement>, experienceIndex: number) => {
            if(experiences == null) return

            const newExperience = [...experiences];
            newExperience[experienceIndex].jobName = e.target.value;
            setExperience(newExperience);
        },
    
        handleBusinessNameChange: (e: React.ChangeEvent<HTMLInputElement>, experienceIndex: number) => {
            if(experiences == null) return

            const newExperience = [...experiences];
            newExperience[experienceIndex].business = e.target.value;
            setExperience(newExperience);
        },
    
        handleDateChange: (e: React.ChangeEvent<HTMLInputElement>, experienceIndex: number) => {
            if(experiences == null) return
            
            const newExperience = [...experiences];
            newExperience[experienceIndex].date = e.target.value;
            setExperience(newExperience);
        },
    
        handleResumeChange: (text: string, index?: number) => {
            if(index === undefined || experiences == null) return;
    
            const newExperience = [...experiences];
            newExperience[index].jobResume = text;
            setExperience(newExperience);
        },
    
        addExperience: () => {
            setExperience(prevState => {
                if(prevState === null) return null

                return [
                    ...prevState, 
                    {
                        business: '',
                        jobName: '',
                        jobResume: '',
                        duties:  [''],
                        achievements: [''],
                        appliedTechnologies: [''],
                        date: ''
                    }
                ]});
        },
    
        deleteExperience: (experienceIndex: number) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this experience?");

            if(!confirmDelete) return

            setExperience(prevState => {
                if(prevState === null) return null

                return prevState.filter((item, index) => index !== experienceIndex)});
        }
    }

    const handleDuties = {
        addDuty: (experienceIndex: number) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences]; 
                experiencesCopy[experienceIndex].duties.push('');
                return experiencesCopy;
            });
        },

        deleteDuty: (experienceIndex: number, dutyIndex: number) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences];
                experiencesCopy[experienceIndex].duties.splice(dutyIndex, 1);
                return experiencesCopy;
            });
        },

        handleDutyChange: (experienceIndex: number, dutyIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences]; 
                experiencesCopy[experienceIndex].duties[dutyIndex] = e.target.value;
                return experiencesCopy;
            });
        },

    }

    const handleAchievements = {
        addAchievement: (experienceIndex: number) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences]; 
                experiencesCopy[experienceIndex].achievements.push('');
                return experiencesCopy;
            });
        },

        deleteAchievement: (experienceIndex: number, achievementsIndex: number) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences];
                experiencesCopy[experienceIndex].achievements.splice(achievementsIndex, 1);
                return experiencesCopy;
            });
        },

        handleAchievementChange: (experienceIndex: number, achievementsIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences]; 
                experiencesCopy[experienceIndex].achievements[achievementsIndex] = e.target.value;
                return experiencesCopy;
            });
        },

    }

    const handleAppliedTechnologies = {
        addAppliedTechnologies: (experienceIndex: number) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences]; 
                experiencesCopy[experienceIndex].appliedTechnologies.push('');
                return experiencesCopy;
            });
        },

        deleteAppliedTechnologies: (experienceIndex: number, AppliedTechnologiesIndex: number) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences];
                experiencesCopy[experienceIndex].appliedTechnologies.splice(AppliedTechnologiesIndex, 1);
                return experiencesCopy;
            });
        },

        handleAppliedTechnologiesChange: (experienceIndex: number, AppliedTechnologiesIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
            setExperience(prevExperiences => {
                if(prevExperiences === null) return null

                const experiencesCopy = [...prevExperiences]; 
                experiencesCopy[experienceIndex].appliedTechnologies[AppliedTechnologiesIndex] = e.target.value;
                return experiencesCopy;
            });
        },

    }
 
    return (
        <DashboardLayout
            main={
                <>
                    { expericenceQuery.isLoading && 
                        <Loading/> 
                    }

                    <ExperienceDiv isDark={isDark}>

                        <h1>Experience</h1>

                        {
                            experiences?.map((experience, experienceIndex ) => {
                                return (
                                    <ExperienceContainerDiv 
                                        key={experienceIndex} isDark={isDark}
                                        isClosed={closedExperienceIndex.includes(experienceIndex)}
                                        onDrop={(e: any) => dragHandlers.handleDrop(experienceIndex, e)}
                                        onDragOver={dragHandlers.handleDragOver}
                                        >

                                        <div 
                                            className='DragAndDrop'
                                            draggable
                                            onDragStart={(e) => dragHandlers.handleDragStart(experienceIndex, e)}
                                            >
                                            Drag and Drop
                                        </div>
                                        

                                        <div 
                                            className='closeOrOpen'
                                            onClick={() => closeOrOpenExperienceDiv(experienceIndex)}
                                            >
                                            {closedExperienceIndex.includes(experienceIndex) ? 'Open' : 'Close'}
                                        </div>

                                        <div className='jobInfo'>
                                            <input 
                                                type="text" 
                                                className='jobName' 
                                                value={experience.jobName}
                                                onChange={(e) => handleGlobalExperience.handleJobNameChange(e, experienceIndex)}
                                                placeholder="person's job title"
                                            />

                                            <input 
                                                type="text" 
                                                className='businessName' 
                                                value={experience.business}
                                                onChange={(e) => handleGlobalExperience.handleBusinessNameChange(e, experienceIndex)}
                                                placeholder='business name'
                                            />

                                            <input 
                                                type="text" 
                                                className='date' 
                                                value={experience.date}
                                                onChange={(e) => handleGlobalExperience.handleDateChange(e, experienceIndex)}
                                                placeholder='working date - ex: 05/18 to 02/21 or 05/18 to today'
                                            />
                                        </div>

                                        <br />

                                        <div className='Resume'>
                                            <h2>Write a RESUME of what you did at work.</h2>
                                            <br />
                                            <TextArea
                                                initialTXT={experience?.jobResume}
                                                index={experienceIndex}
                                                onDataReceived={handleGlobalExperience.handleResumeChange}
                                                DoesNotReRenderInitialTXT={true}
                                            />
                                        </div>

                                        <br />

                                        <div className='subContainer'>
                                            <h2>DUTIES, use one line for each duty</h2>

                                            <div>

                                                {
                                                    experience.duties.map((duty, dutyIndex) => {
                                                        return (
                                                            <div key={dutyIndex}>
                                                                <input 
                                                                    type="text" 
                                                                    className='subItemInput'
                                                                    value={duty}
                                                                    placeholder='write a duty here'
                                                                    onChange={(e) => handleDuties.handleDutyChange(experienceIndex, dutyIndex, e) }
                                                                />

                                                                <div 
                                                                    className='deleteButton deleteSubItem'
                                                                    onClick={() => handleDuties.deleteDuty(experienceIndex, dutyIndex)}
                                                                >
                                                                    Delete
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div 
                                                    className='addItem addSubItem' 
                                                    onClick={() => handleDuties.addDuty(experienceIndex)}
                                                >
                                                    add duty
                                                </div>

                                            </div>
            
                                        </div>

                                        <br />

                                        <div className='subContainer'>
                                            <h2>ACHIEVEMENTS, use one line for each achievements</h2>

                                            <div>

                                                {
                                                    experience.achievements.map((achievement, achievementsIndex) => {
                                                        return (
                                                            <div key={achievementsIndex}>
                                                                <input 
                                                                    type="text" 
                                                                    className='subItemInput'
                                                                    value={achievement}
                                                                    placeholder='write an achievement here'
                                                                    onChange={(e) => handleAchievements.handleAchievementChange(
                                                                        experienceIndex, 
                                                                        achievementsIndex, 
                                                                        e
                                                                    )}
                                                                />

                                                                <div 
                                                                    className='deleteButton deleteSubItem'
                                                                    onClick={() => handleAchievements.deleteAchievement(
                                                                        experienceIndex,
                                                                        achievementsIndex
                                                                    )}
                                                                >
                                                                    Delete
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div 
                                                    className='addItem addSubItem' 
                                                    onClick={() => handleAchievements.addAchievement(experienceIndex)}
                                                >
                                                    add achievement
                                                </div>

                                            </div>
            
                                        </div>

                                        <br />

                                        <div className='subContainer'>
                                            <h2>Technologies or abilities used in work: Please use one line for each.</h2>

                                            <div>

                                                {
                                                    experience.appliedTechnologies.map((appliedTechnologie, appliedTechnologieIndex) => {
                                                        return (
                                                            <div key={appliedTechnologieIndex}>
                                                                <input 
                                                                    type="text" 
                                                                    className='subItemInput'
                                                                    value={appliedTechnologie}
                                                                    placeholder='write the technology or ability here '
                                                                    onChange={(e) => handleAppliedTechnologies.handleAppliedTechnologiesChange(
                                                                        experienceIndex, 
                                                                        appliedTechnologieIndex, 
                                                                        e
                                                                    )}
                                                                />

                                                                <div 
                                                                    className='deleteButton deleteSubItem'
                                                                    onClick={() => handleAppliedTechnologies.deleteAppliedTechnologies(
                                                                        experienceIndex,
                                                                        appliedTechnologieIndex
                                                                    )}
                                                                >
                                                                    Delete
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div 
                                                    className='addItem addSubItem' 
                                                    onClick={() => handleAppliedTechnologies.addAppliedTechnologies(experienceIndex)}
                                                >
                                                    add a technology or ability used in work
                                                </div>

                                            </div>
            
                                        </div>

                                        <br />

                                        <div 
                                            onClick={() => handleGlobalExperience.deleteExperience(experienceIndex)} 
                                            className='deleteButton'
                                        >
                                            Delete
                                        </div>

                                    </ExperienceContainerDiv>
                                )
                            })
                        }

                        <div className='addItem' onClick={handleGlobalExperience.addExperience}>
                            Add experience
                        </div>

                    </ExperienceDiv>
                </>
            }

            nextRouter={`../${id}/createCv`}
            previousRouter={`../${id}/skills`}
        />
    )
}

export default Experience