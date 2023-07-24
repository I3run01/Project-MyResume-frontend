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

`