import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { SkillsDiv } from '@/styles/skills.module'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'

type collegeType = {
    trainningArea: string
    collegeName: string
    graduationYear: string
}

type languagesType = {
    language: string
    level: string
}

const Skills = () => {
    const [college, setCollege] = useState<collegeType[] | null>(null)
    const [languages, setLanguages] = useState<languagesType[] | null>(null)
    const [abilities, setAbilities] = useState<string[] | null>(null)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter()
    const { id } = router.query;

    const [ 
        collegeQuery, 
        abilitiesQuery,
        languagesQuery,
        sendColleges,
        sendAbilities,
        sendLanguages,
    ] = useQueries([
        {
            queryKey: 'getCollegeDatas',
            queryFn: async () => {
                const response = await new Cvs().getSpecifFieldOfASpecificCv(
                    "colleges",
                    id as string,
                )

                const json = JSON.parse(response)

                return json
            },
        },  
        {
            queryKey: 'getAbilitiesDatas',
            queryFn: async () => {
                const response = await new Cvs().getSpecifFieldOfASpecificCv(
                    "abilities",
                    id as string,
                )

                const json = JSON.parse(response)
                return json
            }, 
        }, 
        {
            queryKey: 'getLanguagesDatas',
            queryFn: async () => {
                const response = await new Cvs().getSpecifFieldOfASpecificCv(
                    "languages",
                    id as string,
                )

                const json = JSON.parse(response)
                
                return json
            }, 
        }, 
        {
            queryKey: 'sendColleges',
            queryFn: async () => {
                if(college === null) return

                const response = await new Cvs().updateCvField(
                    "colleges",
                    id as string,
                    college
                )

                const json = JSON.parse(response)
                return json
            },
            enabled:false
        },  
        {
            queryKey: 'sendAbilities',
            queryFn: async () => {
                if(abilities === null) return

                const response = await new Cvs().updateCvField(
                    "abilities",
                    id as string,
                    abilities
                    )
                    
                    const json = JSON.parse(response)
                    return json
                }, 
                enabled:false
            }, 
            {
                queryKey: 'sendLanguages',
                queryFn: async () => {
                    if(languages === null) return

                    const response = await new Cvs().updateCvField(
                        "languages",
                        id as string,
                        languages
                    )
    
                    const json = JSON.parse(response)
                    return json
                }, 
                enabled:false
            }, 
    ])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')
    }, [])

    useEffect(() => {
        if(!collegeQuery.data) return
        
        setCollege(collegeQuery.data)
    }, [collegeQuery.data])

    useEffect(() => {
        if(!abilitiesQuery.data) return

        setAbilities(abilitiesQuery.data)
    }, [abilitiesQuery.data])

    useEffect(() => {
        if(!languagesQuery.data) return

        setLanguages(languagesQuery.data)
    }, [languagesQuery.data])

    useEffect(() => {
        sendColleges.refetch()
    }, [college])

    useEffect(() => {
        sendLanguages.refetch()
    }, [languages])

    useEffect(() => {
        sendAbilities.refetch()
    }, [abilities])

    const collegeHandlers = {
        handleTrainningAreaChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            if(college == null) return 

            const newCollege = [...college];
            newCollege[key].trainningArea = e.target.value;
            setCollege(newCollege);
        },
    
        handleCollegeNameChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            if(college == null) return 

            const newCollege = [...college];
            newCollege[key].collegeName = e.target.value;
            setCollege(newCollege);
        },
    
        handleGraduationYearChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            if(college == null) return

            const newCollege = [...college];
            newCollege[key].graduationYear = e.target.value;
            setCollege(newCollege);
        },
    
        addNewCollege: () => {
            setCollege(prevState => {
                if(prevState === null) {
                    return null
                }
        
                return [...prevState, {
                    trainningArea: '',
                    collegeName: '', 
                    graduationYear: '' 
                }];
            });
        },
        
        deleteCollege: (key: number) => {
            setCollege(prevState => {
                if (prevState === null) {
                    return null;
                }
        
                return prevState.filter((item, index) => index !== key);
            });
        }
        
    };

    const abilitiesHandlers = {
        addNewAbility: () => {
            setAbilities(prevState => {

                if(prevState == null) return null

                return [...prevState, '']}
            );
        },
    
        deleteAbility: (key: number) => {
            setAbilities(prevState => {
                
                if(prevState === null) return null

                return prevState.filter((item, index) => index !== key)
            });
        },

        handleAbilityChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {

            if(abilities === null) return
 
            const newAbilities = [...abilities];
            newAbilities[key] = e.target.value;
            setAbilities(newAbilities);
        },
    }

    const languageHandlers = {
        addLanguage: () => {
            setLanguages(prevState => {
                
                if(prevState === null) return null

                return [...prevState, {
                    language:'',
                    level:''
                }]
            });
        },
    
        deleteLanguage: (key: number) => {
            setLanguages(prevState => {
                
                if(prevState === null) return null

                return prevState.filter((item, index) => index !== key)
            });
        },

        handleLanguageName: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        
            if(languages === null) return

            const newLanguageName = [...languages];
            newLanguageName[key].language = e.target.value;
            setLanguages(newLanguageName);
        },

        handleLanguageLevel: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {

            if(languages === null) return

            const newLanguageName = [...languages];
            newLanguageName[key].level = e.target.value;
            setLanguages(newLanguageName);
        },
    }

    return (
        <DashboardLayout
            main={
                <SkillsDiv isDark={isDark}>
                    <h1>Skills</h1>
                    <h2>Academic formation</h2>

                    {
                        college?.map((item, key) => {
                            return (
                                <div key={key} >
                                    <input type="text"
                                        placeholder='Trainnning area'
                                        onChange={(e) => collegeHandlers.handleTrainningAreaChange(e, key)}
                                        value={item.trainningArea}
                                    />

                                    <input type="text" 
                                        placeholder='Education institution'
                                        onChange={(e) => collegeHandlers.handleCollegeNameChange(e, key)}
                                        value={item.collegeName}
                                    />

                                    <input type="text" 
                                        placeholder='Year of graduation'
                                        onChange={(e) => collegeHandlers.handleGraduationYearChange(e, key)}
                                        value={item.graduationYear}
                                    />

                                    <div onClick={() => collegeHandlers.deleteCollege(key)} className='deleteButton'>
                                        Delete
                                    </div>

                                </div>
                            )
                        })
                    }
                    <div onClick={()=> collegeHandlers.addNewCollege()} className='addItem'>
                        Add a new academic formation.
                    </div>

                    <h2>Abilities and technology knowledge</h2>

                    {
                        abilities?.map((item, key) => {
                            return (
                                <div key={key} >
                                    <input type="text"
                                        placeholder='abilities or technologies'
                                        onChange={(e) => abilitiesHandlers.handleAbilityChange(e, key)}
                                        value={item}
                                    />
                                    <div onClick={() => abilitiesHandlers.deleteAbility(key)} className='deleteButton'>
                                        Delete
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='addItem' onClick={() => abilitiesHandlers.addNewAbility()}>
                        Add a new ability or technology
                    </div>

                    <h2>Languages</h2>

                    {
                        languages?.map((item, key) => {
                            return (
                                <div key={key} >
                                    <input type="text"
                                        placeholder='Language'
                                        onChange={(e) => languageHandlers.handleLanguageName(e, key)}
                                        value={item.language}
                                    />

                                    <input type="text" 
                                        placeholder='Level'
                                        onChange={(e) => languageHandlers.handleLanguageLevel(e, key)}
                                        value={item.level}
                                    />

                                    <div onClick={() => languageHandlers.deleteLanguage(key)}
                                        className='deleteButton'
                                     >
                                        Delete
                                    </div>

                                </div>
                            )
                        })
                    }
                    <div onClick={()=> languageHandlers.addLanguage()} className='addItem'>
                        Add a new language
                    </div>
                    
                </SkillsDiv>
            }

            nextRouter={`../${id}/experience`}
            previousRouter={`../${id}/resume`}
        />
    )
}

export default Skills