import { ReactElement } from "react"
import { LeftMenu } from '@/components/leftMenu/leftMenu'
import { DashboardLayoutDiv } from './dashboardLaout.module'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

type props = {
    main: ReactElement
    bottomMenu?: ReactElement
    nextRouter?: string
    previousRouter?:string
}

export const DashboardLayout = ({main, bottomMenu, nextRouter, previousRouter}: props) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)

    return (
        <DashboardLayoutDiv
            isDark={isDark}
        >  
            <LeftMenu/>
            <div className="children">
                <div className="content">
                    {main}
                </div>
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