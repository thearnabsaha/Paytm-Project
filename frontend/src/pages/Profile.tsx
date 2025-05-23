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
    const [data, setData] = useRecoilState(userAtom);

    return (
        <div>
            {/* <h1>{data.username}</h1>
        <h1>{data.firstname}</h1>
        <h1>{data.lastname}</h1>
        <h1>{data.email}</h1>
        <h1>{data.balance}</h1> */}

            <div className="flex px-10 justify-between py-5">
                <Card className="w-[40vw]">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center">
                            <Avatar className="size-15">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-3xl font-light">AS</AvatarFallback>
                            </Avatar>
                            <h1 className="text-3xl pt-2">Arnab Saha</h1>
                        </CardTitle>
                        <CardDescription className="text-center">
                            <p>@thearnabsaha</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                            <p className="font-bold">Email : <span className="font-light">thearnabsaha201@gmail.com</span></p>
                            <p className="font-bold">Balance : <span className="font-light">6000</span></p>
                    </CardContent>
                </Card>
                <Card className="w-[50vw]">
                    <CardHeader>
                        <CardTitle>Transaction</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Profile