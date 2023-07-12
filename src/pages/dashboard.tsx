import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/layouts/dashboardLayout/dashboardLayout"
import { DashboardDiv } from '@/styles/dashboard.module'

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('./middlewarePage')
    }, [])
    
    return (
        <DashboardLayout>
            <DashboardDiv>
                dashboard 
            </DashboardDiv>
        </DashboardLayout>
    )
}

export default Dashboard