import styled from "styled-components";
import { themes } from '@/styles/variables.module'

type Props = {
    isDark: boolean
}

export const ResumeDiv = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${props => props.isDark ? themes.dark.backgroundOne : themes.light.backgroundOne};

    min-height: 100vh;

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather';
    }

    h1 {
        font-size: 24px;
        padding-top: 20px;
    }

    .content {
        width: 1200px;

        h2 {
            font-size: 16px;
            margin-top: 40px;
            align-self: flex-start;
        }

        .textArea {
            align-self: flex-start;
        }

    }
`
