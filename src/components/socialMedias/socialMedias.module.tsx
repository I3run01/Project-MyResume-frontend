import { styled } from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const SocialMediasDiv = styled.div<props>`

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';
        font-size: 16px;
    }

    input {
        background-color: transparent;
        height: 30px;
        border: none;
        width: min-content;
    }



`