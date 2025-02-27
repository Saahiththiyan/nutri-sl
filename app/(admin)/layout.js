import './../globals.css'
import MainNav from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'

export const metadata = {
  title: 'FitSL',
  description: 'Revolutionize diet management'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='hidden flex-col md:flex'>
          <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
              {/* <TeamSwitcher /> */}
              <MainNav className='mx-6' />
              <div className='ml-auto flex items-center space-x-4'>
                {/* <Search /> */}
                <UserNav />
              </div>
            </div>
          </div>
            {children}

        </div>
      </body>
    </html>
  )
}
