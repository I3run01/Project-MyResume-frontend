import { ReactElement } from "react"
import { LeftMenu } from '@/components/leftMenu/leftMenu'
import { DashboardLayoutDiv } from './dashboardLaout.module'

type props = {
    children: ReactElement
}

export const DashboardLayout = ({children}: props) => {

    return (
        <DashboardLayoutDiv>  
            <LeftMenu/>
            {children}
        </DashboardLayoutDiv>
    )
}