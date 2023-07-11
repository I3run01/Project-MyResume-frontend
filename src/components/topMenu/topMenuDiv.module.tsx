import styled from "styled-components";
import { themes } from '@/styles/Variables.module'

type Props = {
    isDark: boolean
}

export const TopMenuDiv = styled.div<Props>`
    height: 60px;
    z-index: 10;

    * {
        color: ${ props => props.isDark ? themes.dark.fontColor : themes.light.fontColor };
        font-family: 'Dosis';
        font-size: 18px;
        text-decoration: none;
    }

    #topMenuContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        background-color: ${props => props.isDark ?  themes.dark.backgroundTwo: themes.light.backgroundTwo};
        border-bottom: 1px solid black;

        height: 60px;

        .theme {
            padding: 5px;
            margin-left: 20px;
            border: 1px solid transparent; 
            transition: all 0.5s ease-in-out;
        }

        .theme:hover {
            border-color: ${themes.global.colorTheme};
            border-radius: 6px;
            cursor: pointer;
        }

        .options {
          display: flex ;
          flex-direction: row;

          .signin, .signup, .dashboard {
              padding: 5px;
              margin-right: 20px;
              border: 1px solid transparent; 
              transition: all 0.5s ease-in-out;
          }

          :hover {
            border-color: ${themes.global.colorTheme};
            border-radius: 6px;
          }
        }
        
        
    }
`
