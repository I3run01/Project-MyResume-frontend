import { styled } from "styled-components";
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

export const DashboardDiv = styled.div<props>`
    background-color: ${props => props.isDark ? themes.dark.backgroundOne : themes.light.backgroundOne};

    min-height: 100vh;
`