import { userAtom } from "@/store/UserAtom";
import { useRecoilState } from "recoil";
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card"
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
import { LuDownload } from "react-icons/lu";
type Transaction = {
    _id: string;
    to: { username: string, firstname: string, lastname: string, _id: string };
    from: { username: string, firstname: string, lastname: string, _id: string };
    amount: number;
    createdAt: string;
};
const Profile = () => {
    const [data, _setData] = useRecoilState(userAtom);
    const [transactions, setTransactions] = useState<Transaction[]>([])
    useEffect(() => {
        if (!data.username) {
            return;
        }
        axios.get(`${API_URL}/transaction/${data.username}`, { headers: { token: token } })
            .then((e) => {
                setTransactions(e.data.transactions)
            })
            .catch((e) => console.log(e))
    }, [data.username])
    const handleExport = () => {
        axios.get(`${API_URL}/export/${data.username}`, { headers: { token: token }, responseType: "blob" })
            .then((e) => {
                const blob = new Blob([e.data], { type: e.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${data.username}-Transctions-report.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .then((e)=>console.log(e))
    }
    return (
        <div>
            <div className="md:flex md:px-20 sm:px-10 px-6 justify-between py-5 text-sm">
                <Card className="w-full md:w-[40vw] h-[35vh] sm:h-[30vh] m-1">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center">
                            <Avatar className="size-15">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-3xl font-light uppercase">{data.firstname[0]}{data.lastname[0]}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-3xl pt-2">{data.firstname} {data.lastname}</h1>
                        </CardTitle>
                        <CardDescription className="text-center">
                            <p>@{data.username}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold">Email : <span className="font-light">{data.email}</span></p>
                        <p className="font-bold">Balance : <span className="font-light">{data.balance} </span></p>
                    </CardContent>
                </Card>
                <Card className="w-full md:w-[50vw] h-[80vh] m-1 mt-5 sm:mt-1">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl relative">
                            <h1>Transaction</h1>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className=" absolute top-0 right-0 cursor-pointer" onClick={handleExport}><LuDownload /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Export Transaction In Excel</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription>Here you will see all Your Transactions</CardDescription>
                    </CardHeader>
                    <CardContent className=" overflow-auto p-0">
                        {
                            transactions.map((e) => {
                                return (
                                    <div className={`border rounded-md p-5 m-1`} key={e._id}>
                                        <div className="flex justify-between items-center mb-5">
                                            <p><span className="font-bold">Transaction No : </span>{e._id}</p>
                                            <p className={`text-xl p-2 font-bold ${e.from._id !== data.id ? " text-green-500" : "text-red-500"}`}>{e.from._id !== data.id ? "+" : "-"}{e.amount}/-</p>
                                        </div>
                                        <p className=" font-light"><span className="font-bold capitalize">To : {e.to.firstname} {e.to.lastname}</span> @{e.to.username}</p>
                                        <p className=" font-light"><span className="font-bold">From : {e.from.firstname} {e.from.lastname}</span> @{e.from.username}</p>
                                        <p className="mt-5"><span className="font-bold">Transaction Time : </span>{new Date(e.createdAt).toLocaleString()}</p>
                                    </div>
                                )
                            })
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile