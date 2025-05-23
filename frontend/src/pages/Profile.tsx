import { userAtom } from "@/store/UserAtom";
import { useRecoilState } from "recoil";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")

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
        if(!data.username){
            return;
        }
        axios.get(`${API_URL}/transaction/${data.username}`, { headers: { token: token } })
            .then((e) => {
                setTransactions(e.data.transactions)
            })
            .catch((e) => console.log(e))
    }, [data.username])
    return (
        <div>
            <div className="flex px-20 justify-between py-5">
                <Card className="w-[40vw] h-[30vh] m-1">
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
                <Card className="w-[50vw] h-[80vh] m-1">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Transaction</CardTitle>
                        <CardDescription>Here you will see all Your Transactions</CardDescription>
                    </CardHeader>
                    <CardContent className=" overflow-auto">
                        {
                            transactions.map((e) => {
                                return (
                                    <div className={`border rounded-md p-5 m-2`} key={e._id}>
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