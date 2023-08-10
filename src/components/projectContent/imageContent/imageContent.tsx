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
    onDataReceived: (index:number, content: contentImage) => void
}

export const ImageContent = ({content, index, onDataReceived}: props) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const [contentState, setContentState] = useState<contentImage | null>(null)
    const { t } = useTranslation()

    useEffect(() => {
        setContentState(content)
    }, [])

    useEffect(() => {
        if(!contentState) return

        onDataReceived(index, contentState)
    }, [contentState])

    const handleImageChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
    
        if(file) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    const base64String = reader.result;

                    if(!contentState) return
    
                    const updatedContentImage: contentImage = {
                        ...contentState,
                        image: base64String
                    };
                    setContentState(updatedContentImage);

                } 
            };
    
            reader.readAsDataURL(file);
        }
    }

    const setTitle = (newTitle: string) => {
        setContentState(prevState => prevState ? { ...prevState, title: newTitle } : null);
    }
    
    const setText = (newText: string) => {
        setContentState(prevState => prevState ? { ...prevState, text: newText } : null);
    }
    
    return (
        <ImageContentDiv>

            <Fragment>
                <Components.label
                isDark={isDark}>
                    {t("content title")}:
                </Components.label>

                <Components.Input
                isDark={isDark}
                type='text'
                value={contentState?.title}
                onChange={(e: any) => { setTitle(e.target.value)}}/>

                <br />
                
                <Components.Input
                isDark={isDark}
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={handleImageChanges}/>


                <div className='contentContainer'>

                    <img src={contentState?.image ? contentState.image : imageCode64} alt="" />

                    <TextArea
                    initialTXT={content.text}
                    width="400px"
                    onDataReceived={setText}
                    />

                </div>
            </Fragment>

        </ImageContentDiv>
    )
}