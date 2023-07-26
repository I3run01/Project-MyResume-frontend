import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { Loading } from '@/components/loading'
import { Components } from '@/styles/components.module'

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
                <>
                    { (collegeQuery.isLoading || abilitiesQuery.isLoading || languagesQuery.isLoading)  && 
                        <Loading/> 
                    }
                
                    <main>
                        <h1>Skills</h1>
                        <h2>Academic formation</h2>

                        {
                            college?.map((item, key) => {
                                return (
                                    <div key={key} >
                                        <Components.Input type="text"
                                            placeholder='Trainnning area'
                                            onChange={(e: any) => collegeHandlers.handleTrainningAreaChange(e, key)}
                                            value={item.trainningArea}
                                            isDark={isDark}
                                            width='600px'
                                        />

                                        <Components.Input type="text" 
                                            placeholder='Education institution'
                                            onChange={(e: any) => collegeHandlers.handleCollegeNameChange(e, key)}
                                            value={item.collegeName}
                                            isDark={isDark}
                                        />

                                        <Components.Input type="text" 
                                            placeholder='Year of graduation'
                                            onChange={(e: any) => collegeHandlers.handleGraduationYearChange(e, key)}
                                            value={item.graduationYear}
                                            isDark={isDark}
                                        />

                                        <Components.DeleteButton 
                                            onClick={() => collegeHandlers.deleteCollege(key)}
                                            isDark={isDark}
                                        >
                                            Delete
                                        </Components.DeleteButton>

                                    </div>
                                )
                            })
                        }
                        <Components.AddItemButton 
                            onClick={()=> collegeHandlers.addNewCollege()}
                            isDark={isDark}
                        >
                            Add a new academic formation.
                        </Components.AddItemButton>

                        <h2>Abilities and technology knowledge</h2>

                        {
                            abilities?.map((item, key) => {
                                return (
                                    <div key={key} >
                                        <Components.Input type="text"
                                            placeholder='abilities or technologies'
                                            onChange={(e: any) => abilitiesHandlers.handleAbilityChange(e, key)}
                                            value={item}
                                            isDark={isDark}
                                        />
                                        <Components.DeleteButton 
                                            onClick={() => abilitiesHandlers.deleteAbility(key)}
                                            isDark={isDark}
                                        >
                                            Delete
                                        </Components.DeleteButton>
                                    </div>
                                )
                            })
                        }

                        <Components.AddItemButton 
                            onClick={() => abilitiesHandlers.addNewAbility()}
                            isDark={isDark}
                        >
                            Add a new ability or technology
                        </Components.AddItemButton>

                        <h2>Languages</h2>

                        {
                            languages?.map((item, key) => {
                                return (
                                    <div key={key} >
                                        <Components.Input type="text"
                                            placeholder='Language'
                                            onChange={(e: any) => languageHandlers.handleLanguageName(e, key)}
                                            value={item.language}
                                            isDark={isDark}
                                        />

                                        <Components.Input type="text" 
                                            placeholder='Level'
                                            onChange={(e: any) => languageHandlers.handleLanguageLevel(e, key)}
                                            value={item.level}
                                            isDark={isDark}
                                        />

                                        <Components.DeleteButton 
                                            onClick={() => languageHandlers.deleteLanguage(key)}
                                            isDark={isDark}
                                        >
                                            Delete
                                        </Components.DeleteButton>

                                    </div>
                                )
                            })
                        }
                        <Components.AddItemButton 
                            onClick={()=> languageHandlers.addLanguage()}
                            isDark={isDark}
                        >
                            Add a new language
                        </Components.AddItemButton>
                        
                    </main>
                </>
            }

            nextRouter={`../${id}/experience`}
            previousRouter={`../${id}/resume`}
        />
    )
}

export default Skills