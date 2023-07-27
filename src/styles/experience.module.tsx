import { styled } from "styled-components";
import { themes } from "./variables.module";

type props = {
    isDark: boolean
}

type containerProps = {
    isDark: boolean
    isClosed: boolean
}

export const ExperienceDiv = styled.div<props>`

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather'
    }

    padding-bottom: 50px;

    input {
        margin-top: 20px;
        border: none;
        border-bottom: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        min-height: 30px;
        background-color: transparent;
    }
    
    .addItem {
        margin-top: 30px;
        
        padding: 10px;
        width: 200px;
        border-radius: 4px;
        border: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

        cursor: pointer;

        &:hover {
            background-color: #49868b55;
        }
    }

    .deleteButton {
        background-color: #cd030362;
        color: #d12121b0;
        padding: 4px;

        width: fit-content;
        border-radius: 4px;

        margin-top: 10px;

        cursor: pointer;

        &:hover {
            background-color: #cd030383;
        }
    }

    .subContainer {
        margin-top: 20px;
        margin-left: 20px;

        padding: 10px;

        border-left: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

        .addSubItem, .deleteSubItem {
            scale: 80%;
        }

        .addSubItem {
            margin-left: -20px;
        }

        .subItemInput {
            width: 800px;
            height: 30px;
            font-size: 18px;
        }

        @media screen and (max-width: 1200px) {
            .subItemInput {
                width: 90%
            }
        }

    }

`

export const ExperienceContainerDiv = styled.div<containerProps>`
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;

    height: ${props => props.isClosed ? '180px' : 'auto'};

    overflow-y: hidden;

    border-left: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

    transition: all 0.5s ease-in-out;

    .jobName, .businessName, .date {
        font-size: 18px;
        margin-right: 10px;
        width: fit-content;
    }

    .date {
        width: 450px;
    }  

    .closeOrOpen, .DragAndDrop {
        border:  1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

        padding: 5px;

        border-radius: 4px;

        cursor: pointer;

        width: fit-content;
        
        margin-top: 12px;
        margin-bottom: 12px;

        &:hover {
            background-color: #00d5ff4f;
        }
    }

`


