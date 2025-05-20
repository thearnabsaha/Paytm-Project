import { Input } from "@/components/ui/input"
import Users from "@/components/Users"
import { userAtom } from "@/UserAtom"
// import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
// const API_URL = import.meta.env.VITE_API_URL

const token=localStorage.getItem("token")
const Dashboard = () => {
  // const navigate=useNavigate()
  const [data, setData] = useRecoilState(userAtom);
  useEffect(() => {
    if(!token){
      // navigate("/signup")
    }
    
  }, [])
  console.log(data)
  return (
    <div className="px-10">
      <h1 className="font-bold text-2xl pt-5">Your Balence : {data.balance}</h1>
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