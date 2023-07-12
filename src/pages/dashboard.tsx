import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('./middlewarePage')
    }, [])
    
    return (
        <div>
            dashboard
        </div>
    )
}

export default Dashboard