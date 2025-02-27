import React from 'react'
import ClientsList from '@/components/clients-list'
import ClientDialog from '@/components/client-dialog'

const Clients = () => {
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">Clients</h2> */}
          <div className="flex items-center space-x-2">
            <ClientDialog />
            
          </div>
        </div>
        <ClientsList />
      </main>
    </>
  )
}

export default Clients