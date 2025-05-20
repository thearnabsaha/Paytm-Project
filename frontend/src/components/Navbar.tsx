import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL
const Navbar = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({ firstname: "", lastname: "" })
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      return;
    }
    axios.get(`${API_URL}/user`, { headers: { token: token } })
      .then((e) => setData(e.data.data))
      .catch((e) => console.log(e))
  }, [])
  const firstname = data.firstname;
  const lastname = data.lastname;
  const logoutHandler=()=>{
    localStorage.removeItem("token")
    navigate("/signup")
  }
  return (
    <div className="flex justify-between px-10 py-5 border">
      <h1 className="text-3xl font-bold">Payments App</h1>
      <div className="flex items-center">
        <p className="text-xl pr-2">Hello, {firstname}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{firstname[0] || "".toUpperCase()}{lastname[0] || "".toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar