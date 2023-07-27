import { styled } from "styled-components";
import { themes } from "./variables.module";

type props = {
    isDark: boolean
}

export const CreateCvDiv = styled.div<props>`
    
    .createCv {
        padding: 10px;

        border: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        border-radius: 5px;

        width: fit-content;

        margin-top: 20px;

        cursor: pointer;

        &:hover {
            background-color: #00aeff70;
        }
    }

    .selectLanguage {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-size: 16px;
        border-bottom: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';

        width: 300px;

        padding: 3px;

        padding-top: 8px;

        cursor: pointer;

        margin-top: 10px;

    }

`