import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SocialMediasDiv } from '@/styles/social-mideas.module'
import { useRouter } from 'next/router'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { textChangeRangeIsUnchanged } from 'typescript'

type socialMediasType = {
    title: string
    link: string
};

const SocialMedias = () => {
    const [socialMedias, setSocialMedias] = useState<socialMediasType[] | null>(null);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter()
    const { id } = router.query;

    const [changeSocialMedias, retrievedSocialMedias] = useQueries([
        {
          queryKey: 'changeSocialMedias',
          queryFn: async () => {
            if(socialMedias == null) return

            const response = await new Cvs().updateCvField(
                "socialMedias", 
                id as string, 
                socialMedias
            )

            const json = JSON.parse(response)
            return json

          }, 
          enabled: false
        },
        {
            queryKey: 'getSocialMedias',
            queryFn: async () => {
                const response = await new Cvs().getSpecifFieldOfASpecificCv(
                    "socialMedias", 
                    id as string
                )

                const json = JSON.parse(response)
                return json
            }, enabled: !!id
          },
    ])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')
    }, [])

    useEffect(() => {
        if(
            retrievedSocialMedias.data == null || 
            retrievedSocialMedias.data === textChangeRangeIsUnchanged
        ) return

        setSocialMedias(retrievedSocialMedias.data)

    }, [retrievedSocialMedias.data])

    useEffect(() => {
        changeSocialMedias.refetch()
    }, [socialMedias])

    const addNewItem = () => {
        setSocialMedias(prevState => {
            if (prevState === null) {
                return null
            }

            return [...prevState, { title: '', link: '' }];
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        if(!socialMedias) return

        const newSocialMedias = [...socialMedias];
        newSocialMedias[key].title = e.target.value;
        setSocialMedias(newSocialMedias);
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        if(!socialMedias) return

        const newSocialMedias = [...socialMedias];
        newSocialMedias[key].link = e.target.value;
        setSocialMedias(newSocialMedias);
    };

    const deleteItem = (key: number) => {
        setSocialMedias(prevState => {
            if(prevState === null) return null;
    
            return prevState.filter((item, index) => index !== key);
        });
    };
    return (
        <DashboardLayout
            main={
                <SocialMediasDiv isDark={isDark}>
                    <h1>Social Medias</h1>
                    <h2>Please share your online profiles, such as GitHub, LinkedIn, portfolio, etc.</h2>
                    {socialMedias?.map((item, key) => (
                        <div key={key} className='container'>
                            <input

                                type="text"
                                value={item.title}
                                placeholder="social media"
                                onChange={(e) => handleTitleChange(e, key)}
                            />

                            <input
                                type="text"
                                value={item.link}
                                placeholder="link of social media"
                                onChange={(e) => handleLinkChange(e, key)}
                            />

                            <div onClick={() => deleteItem(key)} className='deleteButton'>
                                Delete
                            </div>

                        </div>
                    ))}

                    <div onClick={addNewItem} className='addItem'>
                        add new link
                    </div>
                </SocialMediasDiv>
            }

            nextRouter={`../${id}/resume`}
            previousRouter={`../${id}/personal-datas`}
        />
    )
}

export default SocialMedias