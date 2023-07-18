import styled from "styled-components";
import { themes } from '@/styles/variables.module'

type Props = {
    isDark: boolean
}

export const MyEditorContainer = styled.div<Props>`
    margin-top: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    * {
        color: ${ props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-size: 18px;
        margin-bottom: 0;
        text-align: justify;
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
        border: 1px solid ${ props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        width: 900px;
        transition: all 0.5s ease-in-out;
        padding: 20px;
        text-align: justify;

        @media screen and (max-width: 1100px) {
            width: 70vw;
        }
    }
`
