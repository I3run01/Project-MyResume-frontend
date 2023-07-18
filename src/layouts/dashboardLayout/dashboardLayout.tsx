import { ReactElement } from "react"
import { LeftMenu } from '@/components/leftMenu/leftMenu'
import { DashboardLayoutDiv } from './dashboardLayout.module'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useRouter } from "next/router"

type props = {
    main: ReactElement
    bottomMenu?: ReactElement
    nextRouter?: string
    previousRouter?:string
}

export const DashboardLayout = ({main, bottomMenu, nextRouter, previousRouter}: props) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

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
                <div className="back" onClick={() => router.push(previousRouter)}>
                    back
                </div>
            }

            { nextRouter &&
                <div className="next" onClick={() => router.push(nextRouter)}>
                    next
                </div>
            }

            
            
            

        </DashboardLayoutDiv>
    )
}