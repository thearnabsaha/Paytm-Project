"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const SignUpschema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  firstname: z.string().min(2, { message: 'Firstname must be at least 2 characters long' }),
  lastname: z.string().min(1, { message: 'lastname must be at least 1 characters long' }),
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
const API_URL=import.meta.env.VITE_API_URL
const Signup = () => {
    const navigate=useNavigate()
  const SignUpform = useForm<z.infer<typeof SignUpschema>>({
    resolver: zodResolver(SignUpschema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })
  function onSubmit(values: z.infer<typeof SignUpschema>) {
    // console.log(values)
    axios.post(`${API_URL}/signup`,values)
    .then((e)=>console.log(e))
    .catch((e)=>console.log(e))
    SignUpform.reset()
    navigate("/signin")
  }
  return (
    <div className='flex'>
      <div className='w-[50vw] h-screen flex flex-col justify-center items-center'>
        <h1 className="text-3xl mb-10">Make a New Account</h1>
        <Form {...SignUpform}>
      <form onSubmit={SignUpform.handleSubmit(onSubmit)} className="space-y-3 w-96">
            <FormField
          control={SignUpform.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={SignUpform.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={SignUpform.control}
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
          control={SignUpform.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={SignUpform.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default Signup