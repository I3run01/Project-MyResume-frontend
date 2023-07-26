import { styled } from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const NoSignedLayoutDiv = styled.div<props>`
    min-height: 100vh;
    overflow-y: auto;
    width: auto;

    background-color: ${props => props.isDark ? themes.dark.backgroundOne: themes.light.backgroundOne};

    .children {
        width: 100%;
        overflow-y: auto;
    }

`