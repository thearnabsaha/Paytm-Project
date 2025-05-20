import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
const Users = () => {
    return (
        <div className="flex justify-between pt-5">
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CK</AvatarFallback>
                </Avatar>
                <h1 className="pl-3 text-xl">User 1</h1>
            </div>
            <Dialog>
                <DialogTrigger><Button>Send Money</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Send Money</DialogTitle>
                        <div className="flex items-center">
                            <Avatar className="size-12">
                                <AvatarImage src="" />
                                <AvatarFallback>AS</AvatarFallback>
                                {/* <AvatarFallback>{firstname[0] || "".toUpperCase()}{lastname[0] || "".toUpperCase()}</AvatarFallback> */}
                            </Avatar>
                            <h1 className="text-2xl pl-2">Arnab Saha</h1>
                        </div>
                        <p>Amount (in Rs):</p>
                        <div>
                            <Input placeholder="Enter Amount" className="h-[40px]"/>
                            <Button className="w-full mt-3 h-[40px]">Initiate Transfer</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users