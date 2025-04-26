'use client'
import React, { useState, useEffect } from 'react'
import ClientsList from '@/components/clients-list'
import ClientDialog from '@/components/client-dialog'
import { supabase } from '@/lib/supabase'

const Clients = () => {
  const [clients, setClients] = useState(null)
  const getData = async () => {
    const { data: clients, error } = await supabase.from('clients').select('*')
    setClients(clients)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">Clients</h2> */}
          <div className="flex items-center space-x-2">
            <ClientDialog getData={() => getData()} />
            
          </div>
        </div>
        <ClientsList clients={clients} setClients={setClients} />
      </main>
    </>
  )
}

export default Clients