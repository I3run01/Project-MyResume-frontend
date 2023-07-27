import { DashboardLayout } from  '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { CreateCvDiv } from '@/styles/createCv.module'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Loading } from '@/components/loading'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { WordCv } from '@/requests/wordCv'
import { useEffect, useState } from 'react'

const CreateCv = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const user = useSelector((state: RootState) => state.user.user)
    const router = useRouter()
    const [cvDatas, setCvDatas] = useState<Object | null>(null)
    const [languages, setLanguages] = useState<string[] | null>(null)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en-usa')
    const { id } = router.query;
    
    const [getSperificCv, createWordCv, languagesQuery] = useQueries([
        {
            queryKey: 'getSpecifCv',
            queryFn: async () => {

                const response = await new Cvs().getSperificCv(id as string)
                const json = JSON.parse(response)

                return json
            },
        },
        {
            queryKey: 'create-word-cv',
            queryFn: async () => {

                if(!cvDatas) return

                const response = await new WordCv().CreateCv(cvDatas, selectedLanguage)
                return {"status": "success"}
            }, enabled: false
        },
        {
            queryKey: 'retrieveLanguages',
            queryFn: async () => {

                const response = await new WordCv().getWordAllowedLanguages()

                let json = JSON.parse(response)
                
                return json
            }
        },
    ])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')

        const storedLanguage = localStorage.getItem(`word-language-${id}`);
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
    }, [])

    useEffect(() => {
        if(!getSperificCv.data) return

        setCvDatas(getSperificCv.data)
    }, [getSperificCv.data])

    useEffect(() => {
        if(!createWordCv.error) return

        alert(createWordCv.error)
    }, [createWordCv.error])

    useEffect(() => {
        if(!languagesQuery.data) return
        
        setLanguages(languagesQuery.data)
    }, [languagesQuery.data])

    function handleLanguageChange(language: string) {
        setSelectedLanguage(language);
        localStorage.setItem(`word-language-${id}`, language);
    }

    return (
        <DashboardLayout
            main={
                <>
                {getSperificCv.isLoading || createWordCv.isLoading &&
                    <Loading/>
                }
                
                    <CreateCvDiv 
                        isDark={isDark}
                    >
                        <h1>Genegate CV</h1>

                        <h2>Select the language</h2>

                        {
                            languages?.map((language, index) => {
                                return (
                                    <div 
                                        className='selectLanguage'
                                        key={index} onClick={() => handleLanguageChange(language)}
                                        style={{ backgroundColor: language === selectedLanguage ? '#00fff235' : 'initial' }}
                                    >
                                        {language}
                                    </div>
                                )
                            } )
                        }

                        <div className='createCv' onClick={() => createWordCv.refetch()}>
                            <p>
                                Click here to generate CV
                            </p>
                        </div>
                    </CreateCvDiv>
                </>
            }

            previousRouter={`../${id}/experience`}
        />
    )
}

export default CreateCv