import { styled } from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const LeftMenuDiv = styled.div<props>`
    width: 200px;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: ${props => props.isDark ? themes.dark.backgroundTwo : themes.light.backgroundTwo};

    border-right: 1px solid;
    border-color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

    * {
        font-family: 'Dosis';
        font-size: 18px;
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
    }

    .options  {
        .menu {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            background-color: #88ff00;
        }

        div {
            margin-top: 10px;
            margin-bottom: 20px;

            padding: 5px;
            padding-left: 20px;
            padding-right: 20px;
            border: 1px solid transparent;

            text-align: center;

            cursor: pointer;

            transition: all 0.2s ease-in-out;

            &:hover {
                border-radius: 7px;
                border-color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
            }
        }
    }

    .settings {
        padding: 7px;
        margin-bottom: 20px;
        border: 2px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        border-radius: 7px;

        cursor: pointer;

        &:hover {
            background-color: #395e6b6f;
        }

    }

    
`