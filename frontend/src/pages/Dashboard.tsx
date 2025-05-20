import { Input } from "@/components/ui/input"
import Users from "@/components/Users"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const token=localStorage.getItem("token")
const Dashboard = () => {
  const navigate=useNavigate()
  useEffect(() => {
    // if(!token){
    //   navigate("/signup")
    // }
  }, [])
  
  return (
    <div className="px-10">
      <h1 className="font-bold text-2xl pt-5">Your Balence : {}</h1>
      <h1 className="font-bold text-xl pt-5 pb-3">Search Users</h1>
      <Input placeholder="Search for Users here"/>
      <Users/>
      <Users/>
      <Users/>
      <Users/>
      <Users/>
    </div>
  )
}

export default Dashboard