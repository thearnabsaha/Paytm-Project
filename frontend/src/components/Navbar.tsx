import { useEffect } from "react"
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
import { userAtom } from "@/store/UserAtom"
import { useRecoilState } from "recoil"
const API_URL = import.meta.env.VITE_API_URL
const Navbar = () => {
  const navigate=useNavigate()
   const [data, setData] = useRecoilState(userAtom);
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate("/signup")
      return;
    }
    axios.get(`${API_URL}/user`, { headers: { token: token } })
      .then((e) => setData(e.data.data))
      .catch((e) => console.log(e))
  }, [])
  const logoutHandler=()=>{
    localStorage.removeItem("token")
    navigate("/signup")
  }
  return (
    <div className="flex justify-between px-10 py-5 border">
      <h1 className="text-3xl font-bold">Payments App</h1>
      <div className="flex items-center">
        <p className="text-xl pr-2">Hello, {data.firstname}</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className=" uppercase">{data.firstname[0] || "".toUpperCase()}{data.lastname[0] || "".toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar