import { styled } from "styled-components";
import { themes } from "./variables.module";

type inputProps = {
    isDark: boolean
    width?: string 
}

type buttonProps = {
    isDark: boolean
    scale?: string 
}

type props = {
    isDark: boolean
}

export const Components = {
    Input: styled.input<inputProps>`
        margin-top: 10px;
        background-color: transparent;
        height: 30px;
        width: ${props => props.width ? props.width : 'min-content'};
        border: none;

        border-bottom: 2px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        margin-left: 10px;

        font-family: 'Merriweather';
        font-size: 16px;

        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
    `,

    DeleteButton: styled.div<buttonProps>`
        background-color: #cd030362;

        color: red;
        padding: 4px;

        width: fit-content;
        border-radius: 4px;

        margin-top: 10px;

        cursor: pointer;

        &:hover {
            background-color: #cd030383;
        }

        scale: ${props => props.scale ? props.scale : '100%'};
    `,

    AddItemButton: styled.div<buttonProps>`
        margin-top: 30px;
        
        padding: 10px;
        width: 200px;
        border-radius: 4px;
        border: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};;

        cursor: pointer;

        &:hover {
            background-color: #498b4975;
        }
    `,

    paragraph: styled.p<props>`
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';
        font-weight: lighter;
        font-size: 18px;

        margin-top: 20px;
        margin-left: 20px;

        line-height: 32px;

        width: 80%;
    `
    
}