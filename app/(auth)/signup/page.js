'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/components/user-auth-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function page () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const supabase = createClientComponentClient()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    })

  }

  // return (
  //   <div>
  //     <h2>Login Form</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Email:</label>
  //         <input
  //           type='email'
  //           value={email}
  //           onChange={handleEmailChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Password:</label>
  //         <input
  //           type='password'
  //           value={password}
  //           onChange={handlePasswordChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <button type='submit'>Submit</button>
  //       </div>
  //     </form>
  //   </div>
  // )
  return (
    <div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0'>
      <Link
        href='/login'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Log in
      </Link>

      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to create your account. You will receive an email verification
            </p>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' value={email} onChange={handleEmailChange} placeholder='m@example.com' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' value={password} onChange={handlePasswordChange} />
          </div>
          <Button onClick={handleSubmit} className='w-full'>Create account</Button>
        </div>
      </div>
    </div>
  )
}

export default page
