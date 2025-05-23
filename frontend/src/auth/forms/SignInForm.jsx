import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '@/redux/user/userSlice'
import GoogleAuth from '@/components/shared/GoogleAuth'
 
const formSchema = z.object({
  email: z.string().email({message:"Invalid email address."}),
  password: z.string().min(8, {message:"password Must be atleast 8 character."}),
})

const SignInForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading, error: errorMessage} = useSelector((state) => state.user)

  const form =  useForm ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:""
    },
  })

  // 2. Define a submit handler.
   async function onSubmit(values) {
    try {
      dispatch(signInStart())

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (data.success === false){
        setLoading(false)
        toast.error( "Sign in Failed Please try again.")

       dispatch(signInFailure(data.message))
      }

      if(res.ok){
         dispatch(signInSuccess(data))
        console.log("Navigating to home page");
        toast.success ( "Sign in Succesful!." )

        navigate("/")
      }
    } catch (error) {
      toast.error( "Something went wrong.")
      dispatch(signInFailure(error.message))

    }
  }
  return (
    <div className='min-h-screen mt-20  '>
      <div className='flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          <div className='flex-1 '>
            <Link to={"/"} className='font-bold text-2xl sm:text-4xl flex flex-wrap'>
            <span className='text-slate-500'>News </span>
            <span className='text-slate-900'>Hunt</span>
            </Link>

            <h2 className='text-[24px] md:text-[34px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12'>Sign in to your account</h2>
            <p className='text-slate-800 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2'>Welcome back to News Hunt, Please Provide the details</p>
          </div> 

          <div className='flex-1'>
            
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter Your MailID" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter Your Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-blue-500 w-full' disabled={loading}>{loading ? (
          <span className='animate-pulse'>Loading...</span>
        ) : (
          <span>Sign In</span>
            )}
          </Button>

          <GoogleAuth />
      </form>
    </Form>
  
            <div className='flex gap-2 text-sm mt-5'>
                <span>Don't Have an account?</span>

                <Link to="/sign-up" className='text-blue-500'>Sign up</Link>
            </div>  

               {errorMessage && <p className='mt-5 text-red-500'>{errorMessage}</p>}

          </div>

      </div>
    </div>
  )
}

export default SignInForm