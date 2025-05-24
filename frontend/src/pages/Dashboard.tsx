import { Input } from "@/components/ui/input"
import Users from "@/components/Users"
import { userAtom } from "@/store/UserAtom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useDebounce } from 'use-debounce';
const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
const Dashboard = () => {
  const [data, _setData] = useRecoilState(userAtom);
  const [filteredData, setfilteredData] = useState([{ username: "", lastname: "", firstname: "", email: "" }])
  const [inputValue, setinputValue] = useState("")
  const [value] = useDebounce(inputValue, 300);
  useEffect(() => {
    axios.get(`${API_URL}/filter?name=${inputValue || " "}`, { headers: { token: token } })
      .then((e) => {
        setfilteredData(e.data.users)
      })
      .catch((e) => console.log(e))
  }, [value])
  return (
    <div className="px-20">
      <h1 className="font-bold sm:text-2xl pt-5">Your Balence : {data.balance}</h1>
      <h1 className="font-bold text-xl pt-5 pb-3">Search Users</h1>
      <Input placeholder="Search for Users here" value={inputValue} onChange={(e) => { setinputValue(e.target.value) }} />
      <div className="mb-10">
      {
        filteredData.map((e) => {
          return (
            e.username != data.username && <Users firstname={e.firstname} lastname={e.lastname} username={e.username} email={e.email} key={e.username + e.email} />
          )
        })
      }
      </div>
    </div>
  )
}

export default Dashboard