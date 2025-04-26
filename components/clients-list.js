'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button'
import { genderList } from '@/data/util'
import { useRouter } from 'next/navigation'
import { FaSpinner, FaEye, FaTrash } from 'react-icons/fa'

const ClientsList = ({clients, setClients}) => {
  const [loading, setLoading] = useState(null)
  const router = useRouter()

  const deleteClient = async (clientId) => {
    setLoading(clientId)
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId)

    if (!error) {
      setClients(clients.filter(client => client.id !== clientId))
    } else {
      console.error("Error deleting client:", error)
    }
    setLoading(null)
  }

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>
            You have a total of {clients?.length} clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Table>
              <TableCaption>A list of your clients.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Full name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Gender</TableHead>
                  <TableHead className="text-right">Age</TableHead>
                  <TableHead className="text-right">Current weight</TableHead>
                  <TableHead className="text-right">Weight goal</TableHead>
                  <TableHead className="text-right">Height</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients?.map(client => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.avatar_url} alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{client.first_name} {client.last_name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="text-right">{genderList[client.gender]}</TableCell>
                    <TableCell className="text-right">{client.age}</TableCell>
                    <TableCell className="text-right">{client.current_weight} Kg</TableCell>
                    <TableCell className="text-right">{client.weight_goal} Kg</TableCell>
                    <TableCell className="text-right">{client.height} cm</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => router.push('/clients/' + client.id)}>
                          <FaEye className="mr-2" />
                          View
                        </Button>
                        <Button 
                          variant='destructive' 
                          onClick={() => deleteClient(client.id)}
                          disabled={loading === client.id}
                        >
                          {loading === client.id ? <FaSpinner className="animate-spin" /> : <FaTrash className="mr-2" />}
                          {loading === client.id ? '' : 'Delete'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ClientsList
