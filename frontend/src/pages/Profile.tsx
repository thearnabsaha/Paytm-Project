import { userAtom } from "@/store/UserAtom";
import { useRecoilState } from "recoil";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
    const [data, _setData] = useRecoilState(userAtom);
    return (
        <div>

            <div className="flex px-10 justify-between py-5">
                <Card className="w-[40vw] h-[30vh]">
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
                <Card className="w-[50vw] h-[80vh]">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Transaction</CardTitle>
                        <CardDescription>Here you will see all Your Transactions</CardDescription>
                    </CardHeader>
                    <CardContent className=" overflow-auto">
                        <p className="border h-30 m-2 text-center pt-2 rounded-md">Card Content</p>
                        <p className="border h-30 m-2 text-center pt-2 rounded-md">Card Content</p>
                        <p className="border h-30 m-2 text-center pt-2 rounded-md">Card Content</p>
                        <p className="border h-30 m-2 text-center pt-2 rounded-md">Card Content</p>
                        <p className="border h-30 m-2 text-center pt-2 rounded-md">Card Content</p>
                        <p className="border h-30 m-2 text-center pt-2 rounded-md">Card Content</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile