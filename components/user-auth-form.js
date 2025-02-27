import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (dataUser) {
        router.push('/clients')
      }
      if (error) {
        setError(error.message)
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p className='text-red-600'>{error}</p>}
          <Button type='submit' disabled={isLoading}>
            {isLoading && (
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In with Email
          </Button>
        </div>
      </form>
    </div>
  )
}
