import { ReactElement } from "react"
import { LeftMenu } from '@/components/leftMenu/leftMenu'
import { DashboardLayoutDiv } from './dashboardLaout.module'

type props = {
    main: ReactElement
    bottomMenu?: ReactElement
    nextRouter?: string
    previousRouter?:string
}

export const DashboardLayout = ({main, bottomMenu, nextRouter, previousRouter}: props) => {

    return (
        <DashboardLayoutDiv>  
            <LeftMenu/>
            <div className="children">
                {main}
            </div>

            { bottomMenu &&
                bottomMenu
            }

            { previousRouter &&
                <div>back</div>
            }

            { nextRouter &&
                <div>next</div>
            }
            

        </DashboardLayoutDiv>
    )
}