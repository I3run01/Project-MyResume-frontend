import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SocialMediasDiv } from './socialMedias.module'

type socialMediasType = {
    title: string
    link: string
}

const SocialMedias = () => {
    const [socialMedias, setSocialMedias] = useState<socialMediasType[]>([]);
    const isDark = useSelector((state: RootState) => state.theme.isDark);

    const addNewItem = () => {
        setSocialMedias(prevState => [...prevState, { title: '', link: '' }]);
    };

    return (
        <SocialMediasDiv isDark={isDark}>
            {socialMedias.map((item, key) => (
                <div key={key}>
                    <input
                        type="text"
                        value={item.title}
                        placeholder="social media"
                    />
                    <input
                        type="text"
                        value={item.link}
                        placeholder="link of social media"
                    />
                </div>
            ))}
            <div onClick={addNewItem}>add new link</div>
        </SocialMediasDiv>
    );
};

export default SocialMedias;
