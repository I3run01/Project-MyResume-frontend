import {  DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PersonalDatasDiv } from '@/styles/personal-datas.module'
import { useRouter } from 'next/router'
import { useQueries } from 'react-query'
import { Cvs } from '@/requests/cvs'
import { Loading } from '@/components/loading'
import { useTranslation } from 'react-i18next';

type personalDatasType = {
    fullName: string,
    birthday: string,
    location: string,
    phone: string,
}

const PersonalDatasPage = () => {
    const isDark = useSelector((state: RootState)=> state.theme.isDark)
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.user);
    const { id } = router.query;
    const { t } = useTranslation();

    const [personalDatas, setPersonalData] = useState<personalDatasType | null>(null)

    const [changePersonalDatas, retreivedPersonalDatas] = useQueries([
        {
          queryKey: 'changePersonalDatas',
          queryFn: async () => {
            if(!personalDatas) return

            const response = await new Cvs().updateCvField("personalDatas", id as string, personalDatas)
            const json = JSON.parse(response)
            return json

          }, 
          enabled: false
        },
        {
            queryKey: 'getPersonalDatas',
            queryFn: async () => {
                const response = await new Cvs().getSpecifFieldOfASpecificCv("personalDatas", id as string)
                const json = JSON.parse(response)

                console.log(json)

                return json
            }, enabled: !!id
          },
    ])

    useEffect(() => {
        if(!user) router.push('/middlewarePage')
    }, [])

    useEffect(() => {
        if(!retreivedPersonalDatas.data) return

        setPersonalData(retreivedPersonalDatas.data)       

    }, [retreivedPersonalDatas.data])

    useEffect(() => {
        changePersonalDatas.refetch()
    }, [personalDatas])

    useEffect(() => {
        if(!changePersonalDatas.error) return

        alert(changePersonalDatas.error)
    }, [changePersonalDatas.error])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!personalDatas) return

        setPersonalData({
            ...personalDatas,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <DashboardLayout
            main={
                <>
                    { retreivedPersonalDatas.isLoading && 
                        <Loading/> 
                    }

                    <PersonalDatasDiv id="personalDatas" className="steps" isDark={isDark}>

                        <h1>{t("personal_data")}</h1>

                        <div>
                            <label>{t("your_full_name")}</label>
                            <input type="text" name="fullName" value={personalDatas?.fullName} onChange={handleInputChange} /> <br /><br />
                        </div>

                        <div>
                            <label>{t("your_birthday")}</label>
                            <input type="date" name="birthday" value={personalDatas?.birthday} onChange={handleInputChange} /> <br /><br />
                        </div>

                        <div>
                            <label>{t("where_you_live")}</label>
                            <input type="text" name="location" value={personalDatas?.location} onChange={handleInputChange} />  <br /><br />
                        </div>

                        <div>
                            <label>{t("contact_number")}</label>
                            <input type="tel" name="phone" value={personalDatas?.phone} onChange={handleInputChange} />  <br /><br />
                        </div>
                    </PersonalDatasDiv>
                </>
            }
            previousRouter='/dashboard/curriculum'

            nextRouter={`../${id}/social-medias`}
        />
    )
}

export default PersonalDatasPage