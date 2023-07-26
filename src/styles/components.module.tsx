import { styled } from "styled-components";
import { themes } from "./variables.module";

type props = {
    isDark: boolean
    width?: string 
}

export const Components = {
    Input: styled.input<props>`
        margin-top: 10px;
        background-color: transparent;
        height: 30px;
        width: ${props => props.width ? props.width : 'min-content'};
        border: none;

        border-bottom: 2px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        margin-left: 10px;

        font-family: 'Merriweather';
        font-size: 16px;

    `
}