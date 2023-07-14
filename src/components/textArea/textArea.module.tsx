import styled from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const MyEditorContainer = styled.div<props>`
    margin-top: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;

    * {
        color: ${ props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-size: 18px;
        margin-bottom: 0;
        text-align: justify;
        font-size: 18px;
        font-family: 'Merriweather', serif;
        font-weight: 400;
        line-height: 1.8em;
    }

    h1 {
        color: ${ props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
    }

    p {
        border: none;
    }

    .public-DraftEditor-content {       
        min-height: 30px;

        border: 1px solid #0000;

        width: 900px;

        transition: all 0.5s ease-in-out;

        padding: 20px;

        text-align: justify;

        border: 1px solid ${ props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
    
    }
`