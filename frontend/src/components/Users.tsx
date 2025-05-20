import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

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
            <Button>Send Money</Button>
        </div>
    )
}

export default Users