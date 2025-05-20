import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const token=localStorage.getItem("token")
  const navigate=useNavigate()
  useEffect(() => {
    // if(!token){
    //   navigate("/signup")
    // }
  }, [])
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard