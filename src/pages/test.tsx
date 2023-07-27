import { useEffect, useState } from "react"
import { styled } from "styled-components"

export const TestDiv = styled.div`
    
    height: 100vh;
    width: 100vw;

    background-color: #0c698068;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    div {
        height: 20%;
        width: 10%;
        background-color: #040b11fd;

        display: flex;
        justify-content: center;
        align-items: center;

        p {
            font-size: 26px;
        }
    }
`

const Test = () => {
    const [divs, setDivs] = useState<any[]>(['item 1', 'item 2', 'item 3'])
    const [dragIndex, setDragIndex] = useState<number | null>(null)

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    }

    const handleDrop = (dropIndex: number) => {
        if (dragIndex === null) {
            return;
        }
        const dragItem = divs[dragIndex];
        const newDivs = [...divs];
        newDivs[dragIndex] = newDivs[dropIndex];
        newDivs[dropIndex] = dragItem;
        setDivs(newDivs);
        setDragIndex(null);
    }

    useEffect(() => {
        console.log(divs)
    }, [divs])

    return (
        <TestDiv>
            {
                divs.map((item, index) => {
                    return (
                        <div
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDrop={() => handleDrop(index)}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <p>{item}</p>
                        </div>
                    )
                })
            }
        </TestDiv>
    )
}

export default Test
