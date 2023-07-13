import { styled } from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const ResumeDiv = styled.div <props>`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${props => props.isDark ? themes.dark.backgroundOne : themes.light.backgroundOne};

    min-height: 100vh;

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';
    }

    h1 {
        font-size: 24px;
        padding-top: 20px;
    }




`