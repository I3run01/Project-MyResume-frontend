import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/layouts/dashboardLayout/dashboardLayout"
import { DashboardDiv } from '@/styles/dashboard.module'
import { Loading } from '@/components/loading'

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const isDark = useSelector((state: RootState) => state.theme.isDark)
    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('./middlewarePage')

        router.push('./dashboard/curriculum/personal-datas')
    }, [])
    
    return (
        <DashboardLayout
            main={
                <DashboardDiv
                    isDark = {isDark}
                >
                    <Loading/> 
                </DashboardDiv>
            }
        />
    )
}

export default Dashboard