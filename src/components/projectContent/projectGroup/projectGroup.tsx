import { Fragment, useEffect, useState } from "react"

type props = {
    projectGroup: string[] | null
}

export const ProjectGroup = ({projectGroup}: props) => {

    const [group, setGroup] = useState<string[]>([])

    useEffect(() => {
        console.log(group)
        
        if(!projectGroup) return
        setGroup(projectGroup)
    }, [projectGroup])

    return (
        <>
            {
                group.map((item, key) => (
                    <Fragment key={key}>
                        {item}
                    </Fragment>
                ))
            }
        </>
    )
}