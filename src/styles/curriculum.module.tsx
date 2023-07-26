import { styled } from "styled-components";
import { themes } from "./variables.module";

type props = {
    isDark: boolean
}

export const CurriculumDiv = styled.div<props>`

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';
        font-weight: lighter;
        
    }

    b {
        font-weight: bold;
    }

    .text {
        padding-top: 20px;
        font-size: 18px;
        padding-bottom: 20px;
    }
    
    .Cvs {
        margin-top: 20px;
        border: none;
        border-bottom: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        min-height: 30px;
        background-color: transparent;

        padding-left: 10px;
        font-size: 16px;

        padding-top: 10px;
        padding-bottom: 10px;

        cursor: pointer;

        &:hover {
            background-color: #1ba8a362;
        }
    }

    .cvsNamesContainer {
        margin-top: 20px;
        margin-bottom: 20px;

        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        align-items: start;
    }




`