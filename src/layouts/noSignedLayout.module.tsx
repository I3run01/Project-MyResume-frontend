import { styled } from "styled-components";
import {themes} from '@/styles/Variables.module'

type props = {
    isDark: boolean
}

export const NoSignedLayoutDiv = styled.div<props>`
    min-height: 100vh;
    overflow-y: auto;
    width: auto;

    background-color: ${props => props.isDark ? themes.dark.backgroundOne: themes.light.backgroundOne};

    .children {
        height: 90px;

        display: flex;
        justify-content: center;

        * {
            max-width: 1200px;
            width: 90%;
        }
    }

`