import styled from "styled-components";
import { themes } from "./variables.module";

type props = {
    isDark: boolean
}

export const SettingsDiv = styled.div<props>`
    
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

    font-size: 18px;
    font-family: 'Dosis';

    .back {
        display: flex;
        justify-content: start;
        align-self: flex-start;

        padding: 5px 15px 5px 15px;
        
        margin-top: 30px;
        margin-left: 15%;

        cursor: pointer;

        border: 2px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        border-radius: 5px;

        &:hover {
            background-color: #8585854a;
        }
    }

    .clickable {
        display: flex;
        justify-content: center;

        padding: 6px;
        border: 2px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        border-radius: 5px;

        margin-top: 30px;

        width: 50%;

        cursor: pointer;

        &:hover {
            background-color: #8585854a;
        }
    }


    
`