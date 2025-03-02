import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

const MainNav = ({ className, ...props }) => {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href='/clients'
        className='text-sm font-medium transition-colors hover:text-primary'
      >
        NutriSL
      </Link>
      <Link
        href='/clients'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Clients
      </Link>
      <Link
        href='/meal-plans'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Meal plans
      </Link>
      <Link
        href='/workout-plans'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Workouts
      </Link>
      <Link
        href='/chat'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Chat
      </Link>
      <Link
        href='/nutri-ai'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        NutriAI
      </Link>
    </nav>
  )
}

export default MainNav
