import { styled } from "styled-components";
import { themes } from "@/styles/variables.module";

type props = {
    isDark: boolean
}

export const DashboardLayoutDiv = styled.div<props>`
    width: 100vw;
    min-height: 100vh;

    display: flex;
    flex-direction: row;
    
    .children {
        width: 100%;
        height: 100vh;

        background-color: ${props => props.isDark ? themes.dark.backgroundOne : themes.light.backgroundOne};

        display: flex;
        flex-direction: column;
        align-items: center;

        .content {
            width: 1200px;
        }
    }

    

    @media screen and (max-width: 1400px) {
        .children > .content {
            width: 95%;
        }
    }



`