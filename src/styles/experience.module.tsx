import { styled } from "styled-components";
import { themes } from "./variables.module";

type props = {
    isDark: boolean
}

export const ExperienceDiv = styled.div<props>`

    * {
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        font-family: 'Merriweather'
    }

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
        color: red;
        padding: 4px;

        width: fit-content;
        border-radius: 4px;

        margin-top: 10px;

        cursor: pointer;

        &:hover {
            background-color: #cd030383;
        }
    }

    .container {
        .jobName, .businessName, .date {
            font-size: 18px;
            margin-right: 10px;
            width: fit-content;
        }

        .date {
            width: 450px;
        }
    }

    .dutiesContainer {
        margin-top: 20px;
        margin-left: 20px;

        padding: 10px;

        border-left: 1px solid ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};

        .addDuty, .deleteDuty {
            scale: 80%;
        }

        .addDuty {
            margin-left: -20px;
        }

    }

`