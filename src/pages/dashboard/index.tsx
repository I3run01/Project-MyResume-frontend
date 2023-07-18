import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/layouts/dashboardLayout/dashboardLayout"
import { Loading } from '@/components/loading'

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('./middlewarePage')

        router.push('./dashboard/curriculum/personal-datas')
    }, [])
    
    return (
        <DashboardLayout
            main={
                <div>
                    <Loading/> 
                </div>
            }
        />
    )
}

export default Dashboard