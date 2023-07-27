import React, { useEffect, useState } from "react"
import styled from "styled-components"

export const TestDiv = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #0c698068;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    div {
        height: 30%;
        width: 20%;
        background-color: #040b11fd;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        div {
            background-color: #a7a713;
            width: fit-content;
            height: fit-content;
            cursor: pointer;
        }
        p {
            font-size: 26px;
        }
    }
`

const Test = () => {
    const [experiences, setexperiences] = useState<any[]>(['item 1', 'item 2', 'item 3'])

    const handleDragStart = (index: number, e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index.toString());
    }

    const handleDrop = (dropIndex: number, e: React.DragEvent) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData("text"));
        const dragItem = experiences[dragIndex];
        const newExperiences = [...experiences];
        newExperiences[dragIndex] = newExperiences[dropIndex];
        newExperiences[dropIndex] = dragItem;
        setexperiences(newExperiences);
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    useEffect(() => {
        console.log(experiences)
    }, [experiences])

    return (
        <TestDiv>
            {experiences.map((item, index) => (
                <div 
                    className="container"
                    onDrop={(e) => handleDrop(index, e)}
                    onDragOver={handleDragOver}
                >
                    <div className="dragButton"
                        draggable
                        onDragStart={(e) => handleDragStart(index, e)}
                    >
                        Drag Button
                    </div>
                    <p>{item}</p>
                </div>
            ))}
        </TestDiv>
    )
}

export default Test;
