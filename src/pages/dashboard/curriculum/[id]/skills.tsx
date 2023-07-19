import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { SkillsDiv } from '@/styles/skills.module'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

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
    const [college, setCollege] = useState<collegeType[]>([])
    const [languages, setLanguages] = useState<languagesType[]>([])
    const [abilities, setAbilities] = useState<string[]>([])
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter()
    const { id } = router.query;

    useEffect(() => {
        if(!user) router.push('../middlewarePage')
    }, [])

    useEffect(() => {
        //TODO: send college to database
        console.log(college)
    }, [college])

    useEffect(() => {
        //TODO: send languages to database
    }, [languages])

    useEffect(() => {
        //TODO: send abilities to database
    }, [abilities])

    const collegeHandlers = {
        handleTrainningAreaChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newCollege = [...college];
            newCollege[key].trainningArea = e.target.value;
            setCollege(newCollege);
        },
    
        handleCollegeNameChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newCollege = [...college];
            newCollege[key].collegeName = e.target.value;
            setCollege(newCollege);
        },
    
        handleGraduationYearChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newCollege = [...college];
            newCollege[key].graduationYear = e.target.value;
            setCollege(newCollege);
        },
    
        addNewCollege: () => {
            setCollege(prevState => [...prevState, {
                trainningArea: '',
                collegeName: '', 
                graduationYear: '' 
            }]);
        },

        deleteCollege: (key: number) => {
            setCollege(prevState => prevState.filter((item, index) => index !== key));
        }
    };

    const abilitiesHandlers = {
        addNewAbility: () => {
            setAbilities(prevState => [...prevState, '']);
        },
    
        deleteAbility: (key: number) => {
            setAbilities(prevState => prevState.filter((item, index) => index !== key));
        },

        handleAbilityChange: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newAbilities = [...abilities];
            newAbilities[key] = e.target.value;
            setAbilities(newAbilities);
        },
    }

    const languageHandlers = {
        addLanguage: () => {
            setLanguages(prevState => [...prevState, {
                language:'',
                level:''
            }]);
        },
    
        deleteLanguage: (key: number) => {
            setLanguages(prevState => prevState.filter((item, index) => index !== key));
        },

        handleLanguageName: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newLanguageName = [...languages];
            newLanguageName[key].language = e.target.value;
            setLanguages(newLanguageName);
        },

        handleLanguageLevel: (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
            const newLanguageName = [...languages];
            newLanguageName[key].level = e.target.value;
            setLanguages(newLanguageName);
        },
    }

    return (
        <DashboardLayout
            main={
                <SkillsDiv isDark={isDark}>
                    <h1>Academic formation</h1>

                    {
                        college.map((item, key) => {
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

                    <h1>Abilities and technology knowledge</h1>

                    {
                        abilities.map((item, key) => {
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

                    <h1>Languages</h1>

                    {
                        languages.map((item, key) => {
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

            nextRouter={`./${id}/experience`}
            previousRouter={`./${id}/resume`}
        />
    )
}

export default Skills