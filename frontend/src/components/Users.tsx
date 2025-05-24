import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const formSchema = z.object({
    amount: z.string().min(1,{ message: 'Amount must be atleast 1' }).max(7, { message: 'Amount must be less than 1000000' }),
})
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import toast, { Toaster } from 'react-hot-toast';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "./ui/input"
import axios from "axios"
import { useState } from "react"
type UsersProps = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
};
const API_URL = import.meta.env.VITE_API_URL
const token=localStorage.getItem("token")

const Users = ({ username, firstname, lastname, email }: UsersProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
        },
    })
    const [disabled, setdisabled] = useState(false)
    function onSubmit(values: z.infer<typeof formSchema>) {
            setdisabled(true)
            axios.post(`${API_URL}/send/${username}?amount=${values.amount}`,{},{ headers: { token: token } })
            .then((e)=>{
                toast.success(e.data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((e)=>console.log(e))
    }
    return (
        <div className="sm:flex justify-between pt-5">
            <Toaster position="top-right" reverseOrder={false}/>
            <div className="flex items-center">
                <HoverCard>
                    <HoverCardTrigger className=" cursor-pointer">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback className=" uppercase">{firstname[0]}{lastname[0]}</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p>Username: @{username}</p>
                        <p>Email: {email}</p>
                    </HoverCardContent>
                </HoverCard>

                <h1 className="pl-3 text-xl capitalize">{firstname} {lastname}</h1>
            </div>
            <Dialog>
                <DialogTrigger><Button className="mt-5 ml-12 sm:m-0">Send Money</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Send Money</DialogTitle>
                        <div className="flex items-center py-3">
                            <Avatar className="size-12">
                                <AvatarImage src="" />
                                <AvatarFallback className=" uppercase">{firstname[0]}{lastname[0]}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-2xl pl-2 capitalize">{firstname} {lastname}</h1>
                        </div>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount (in Rs):</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Amount" className="h-[40px]" {...field} type="number" disabled={disabled}/>
                                                </FormControl>
                                                <FormDescription>
                                                    Send Money to @{username}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full h-[40px]" disabled={disabled}>Initiate Transfer</Button>
                                </form>
                            </Form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users