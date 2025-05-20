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
                        <DialogTitle className="text-2xl">Send Money</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users