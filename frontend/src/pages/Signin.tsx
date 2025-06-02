"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const SignInschema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
import image from '../assets/image.jpg'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
const API_URL = import.meta.env.VITE_API_URL
const Signin = () => {
    const navigate = useNavigate()
    const SignInform = useForm<z.infer<typeof SignInschema>>({
        resolver: zodResolver(SignInschema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    function onSubmit(values: z.infer<typeof SignInschema>) {
        axios.post(`${API_URL}/signin`, values)
            .then((e) => {
                localStorage.setItem("token", e.data.token)
                navigate("/dashboard")
                toast.success('Sign In Successfully')
            })
            .catch((e) => {
                console.log(e.response.data)
                toast.error(e.response.data)
            })
        SignInform.reset()
    }
    return (
        <div className='flex'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='w-[50vw] h-screen flex flex-col justify-center items-center'>
                <div className="absolute top-50 border text-gray-400 p-5 rounded-md">
                    <h1 className="text-center">--Don't need to Signup--</h1>
                    <h1>Demo Username: thearnabsaha</h1>
                    <h1>Demo Password: Arnab@123</h1>
                </div>
                <h1 className="text-3xl mb-10">Login To Your Account</h1>
                <Form {...SignInform}>
                    <form onSubmit={SignInform.handleSubmit(onSubmit)} className="space-y-3 w-96">
                        <FormField
                            control={SignInform.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={SignInform.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className=" underline text-right cursor-pointer" onClick={() => navigate("/signup")}>Don't have an account? Sign up</p>
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className='w-[50vw] h-screen'>
                <img src={image} className='h-full' />
            </div>
        </div>
    )
}

export default Signin