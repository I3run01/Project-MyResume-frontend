import { Fragment } from "react"

type props = {
    projectGroup: string[] | null
}

export const ProjectGroup = ({projectGroup}: props) => {

    return (
        <>
            {
                projectGroup?.map((item, key) => {
                    <Fragment key={key}>
                        {item}
                    </Fragment>
                })
            }
        </>
    )
}