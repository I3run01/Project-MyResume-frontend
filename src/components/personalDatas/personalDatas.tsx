import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { PersonalDatasDiv } from './personalDatas.module'
import { useEffect, useState } from "react"

type personalDatasType = {
    fullName: string,
    birthday: string,
    location: string,
    number: string,
}

const PersonalDatas = () => {
    const isDark = useSelector((state: RootState)=> state.theme.isDark)

    const [personalDatas, setPersonalData] = useState<personalDatasType>({
        fullName: "",
        birthday: "",
        location: "",
        number: ""
    })

    useEffect(() => {
        //TODO: send the datas to backend
    }, [personalDatas])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonalData({
            ...personalDatas,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <PersonalDatasDiv id="personalDatas" className="steps" isDark={isDark}>
            <div>
                <label>Your <b>full name</b>: </label>
                <input type="text" name="fullName" value={personalDatas.fullName} onChange={handleInputChange} /> <br /><br />
            </div>

            <div>
                <label>Your <b>birthday</b>: </label>
                <input type="date" name="birthday" value={personalDatas.birthday} onChange={handleInputChange} /> <br /><br />
            </div>

            <div>
                <label><b>City, state or province, and country</b> where you live: </label>
                <input type="text" name="location" value={personalDatas.location} onChange={handleInputChange} />  <br /><br />
            </div>

            <div>
                <label>Contact <b>number</b>: </label>
                <input type="tel" name="number" value={personalDatas.number} onChange={handleInputChange} />  <br /><br />
            </div>
        </PersonalDatasDiv>
    )
}

export default PersonalDatas
