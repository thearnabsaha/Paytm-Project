import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "./ui/input"
type UsersProps = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
};
const Users = ({ username, firstname, lastname, email }: UsersProps) => {
    console.log(username, firstname, lastname, email)
    return (
        <div className="flex justify-between pt-5">
            <div className="flex items-center">
                <HoverCard>
                    <HoverCardTrigger className=" cursor-pointer">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback className=" uppercase">{firstname[0] || "".toUpperCase()}{lastname[0] || "".toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p>@{username}</p>
                        <p>{email}</p>
                    </HoverCardContent>
                </HoverCard>

                <h1 className="pl-3 text-xl capitalize">{firstname} {lastname}</h1>
            </div>
            <Dialog>
                <DialogTrigger><Button>Send Money</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Send Money</DialogTitle>
                        <div className="flex items-center py-3">
                            <Avatar className="size-12">
                                <AvatarImage src="" />
                                <AvatarFallback>{firstname[0] || "".toUpperCase()}{lastname[0] || "".toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                            <h1 className="text-2xl pl-2 capitalize">{firstname} {lastname}</h1>
                            <span>@{username}</span>
                            </div>
                        </div>
                        <p>Amount (in Rs):</p>
                        <div>
                            <Input placeholder="Enter Amount" className="h-[40px]" />
                            <Button className="w-full mt-3 h-[40px]">Initiate Transfer</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users