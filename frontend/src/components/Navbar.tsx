import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Switch } from "@/components/ui/switch"
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
import { userAtom } from "@/UserAtom"
import { useRecoilState } from "recoil"
import { useTheme } from "./theme-provider"
const API_URL = import.meta.env.VITE_API_URL
const Navbar = () => {
  const { setTheme } = useTheme()
  const navigate = useNavigate()
  const [data, setData] = useRecoilState(userAtom);
  const token = localStorage.getItem("token")
  const theme=localStorage.getItem("vite-ui-theme")
  const [swtichChecked, setswtichChecked] = useState(theme=="light"?false:true)
  const handleSwitch = () => {
    setswtichChecked(prev => !prev)
    swtichChecked ? setTheme("light") : setTheme("dark")
  }
  useEffect(() => {
    if (!token) {
      navigate("/signup")
      return;
    }
    axios.get(`${API_URL}/user`, { headers: { token: token } })
      .then((e) => setData(e.data.data))
      .catch((e) => console.log(e))
  }, [])
  const logoutHandler = () => {
    localStorage.removeItem("token")
    navigate("/signup")
  }
  return (
    <div className="flex justify-between px-20 py-5 border">
      <h1 className="text-3xl font-bold sm:block hidden">Payments App</h1>
      <div className="flex items-center">
        <p className="text-xl sm:pr-2 ">Hello, {data.firstname}</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer sm:p-0 pl-15">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className=" uppercase">{data.firstname[0] || "".toUpperCase()}{data.lastname[0] || "".toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <p>Dark Mode</p>
              <Switch
              checked={swtichChecked}
              onCheckedChange={handleSwitch}
            /></DropdownMenuItem>
            <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar