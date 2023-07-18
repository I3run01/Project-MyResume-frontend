import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { SkillsDiv } from '@/styles/skills.module'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
    // const [languages, setLanguages] = useState<languagesType[]>()
    const [abilities, setAbilities] = useState<string[]>([])
    const isDark = useSelector((state: RootState) => state.theme.isDark)

    useEffect(() => {
        //TODO: send resume to database
    }, [college])

    const handleTrainningAreaChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        const newCollege = [...college];
        newCollege[key].trainningArea = e.target.value;
        setCollege(newCollege);
    };

    const handleCollegeNameChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        const newCollege = [...college];
        newCollege[key].collegeName = e.target.value;
        setCollege(newCollege);
    };

    const handleGraduationYearChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        const newCollege = [...college];
        newCollege[key].graduationYear = e.target.value;
        setCollege(newCollege);
    };

    const addNewCollege = () => {
        setCollege(prevState => [...prevState, {
                trainningArea: '',
                collegeName: '', 
                graduationYear: '' 
        }]);
    };

    const deleteCollege = (key: number) => {
        setCollege(prevState => prevState.filter((item, index) => index !== key));
    };

    const addNewAbility = () => {
        setAbilities(prevState => [...prevState, '']);
    };

    const deleteAbility = (key: number) => {
        setAbilities(prevState => prevState.filter((item, index) => index !== key));
    };

    

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
                                        onChange={(e) => handleTrainningAreaChange(e, key)}
                                        value={item.trainningArea}
                                    />

                                    <input type="text" 
                                        placeholder='Education institution'
                                        onChange={(e) => handleCollegeNameChange(e, key)}
                                        value={item.collegeName}
                                    />

                                    <input type="text" 
                                        placeholder='Year of graduation'
                                        onChange={(e) => handleGraduationYearChange(e, key)}
                                        value={item.graduationYear}
                                    />

                                    <div onClick={() => deleteCollege(key)} className='deleteButton'>
                                        Delete
                                    </div>

                                </div>
                            )
                        })
                    }
                    <div onClick={addNewCollege} className='addItem'>
                        Add a new academic formation.
                    </div>

                    <h1>Abilities and technology knowledge</h1>

                    {
                        abilities.map((item, key) => {
                            return (
                                <div key={key} >
                                    <input type="text"
                                        placeholder='abilities or technologies'
                                        onChange={(e) => handleTrainningAreaChange(e, key)}
                                        value={item}
                                    />
                                    <div onClick={() => deleteAbility(key)} className='deleteButton'>
                                        Delete
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='addItem' onClick={addNewAbility}>
                        Add a new ability or technology
                    </div>

                    <h1>Languages</h1>

                    {/* {
                        languages.map((item, key) => {
                            return (
                                <div key={key} >
                                    <input type="text"
                                        placeholder='Trainnning area'
                                        onChange={(e) => handleTrainningAreaChange(e, key)}
                                        value={item.language}
                                    />

                                    <input type="text" 
                                        placeholder='Education institution'
                                        onChange={(e) => handleCollegeNameChange(e, key)}
                                        value={item.level}
                                    />

                                    <div onClick={() => deleteCollege(key)} className='deleteButton'>
                                        Delete
                                    </div>

                                </div>
                            )
                        })
                    } */}
                    <div onClick={addNewCollege} className='addItem'>
                        Add a new academic formation.
                    </div>
                    
                </SkillsDiv>
            }

            nextRouter='./#'
            previousRouter='./resume'
        />
    )
}

export default Skills