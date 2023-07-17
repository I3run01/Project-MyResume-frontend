import { styled } from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const PersonalDatasDiv = styled.div<props>`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 50px;

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';
        font-size: 16px;
    }
    
    min-height: 100vh;

    div {
        margin-top: 30px;

        input {
            background-color: transparent;
            border: none;
            border-bottom: 2px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
            height: 30px;
            margin-left: 20px;
        }
    }


`