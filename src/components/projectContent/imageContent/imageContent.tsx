import { Fragment, useState, useEffect } from "react"
import { Components } from "@/styles/components.module"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import TextArea from "@/components/textArea/textArea"
import { ImageContentDiv } from './imageContent.module'
import { useTranslation } from "next-i18next"
import { imageCode64 } from './initialImgCode64'

type props = {
    content: contentImage,
    index: number
    onDataReceived: () => void
}

export const ImageContent = ({content, index, onDataReceived}: props) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const [contentState, setContentState] = useState<contentImage | null>(null)
    const { t } = useTranslation()

    useEffect(() => {
        setContentState(content)
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const file = e.target.files ? e.target.files[0] : null;

        if(file) {
            const reader = new FileReader();
        
            reader.onloadend = function() {
                // Set the image data in your contentState (or wherever you need it)
                const base64String = reader.result;
                // Here, update your state or whatever you want to do with base64String
            };
        
            reader.readAsDataURL(file);

        }
    
    }
    
     
    return (
        <ImageContentDiv>

            <Fragment>
                <Components.label
                isDark={isDark}>
                    {t("content title")}
                </Components.label>

                <Components.Input
                    isDark={isDark}
                    type='text'
                    value={content.title}/>

                <br />

                <Components.Input
    isDark={isDark}
    type="file"
    accept="image/jpg, image/jpeg, image/png"
    onChange={handleFileChange}>
    {t("change image")}
</Components.Input>


                <div className='contentContainer'>

                    <img src={imageCode64} alt="" />

                    <TextArea
                        initialTXT={content.text}
                        width="400px"
                    />
                </div>
            </Fragment>

        </ImageContentDiv>
    )
}