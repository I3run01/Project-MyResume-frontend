import { styled } from "styled-components";
import { themes } from '@/styles/Variables.module'

type props = {
    isDark: boolean
}

export const HomeDiv = styled.div<props>`
    padding-top: 20px;

    * {
        font-weight: lighter;
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        text-align: center;
    }

    .container {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        

        .text, .image {           
            img {
                margin-top: 20px;
                border: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
                box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.3);
            }
    
            h1 {
                font-family: 'Dosis';
                font-family: 36px;
                color: ${themes.global.colorTheme};
            }
            
            p {
                font-size: 16px;
            }
        }
    }

    @media screen and (max-width: 800px) { 
        .container {
            flex-wrap: wrap;
        }
    }
    

    
    
    
    

`