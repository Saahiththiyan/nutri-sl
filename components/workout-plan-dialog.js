'use client'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { supabase } from '@/lib/supabase'
import { FaPlus } from 'react-icons/fa'

const WorkoutplanDialog = ({getData}) => {
  const [name, setName] = useState('')
  const [clientId, setClientId] = useState('')
  const [clients, setClients] = useState([])
  const [open, setOpen] = useState(false);
  
  const insertWorkoutPlan = async () => {
    const { data, error } = await supabase
    .from('workout-plans')
    .insert([
      { name: name, client_id: clientId }
    ])
    .select()
    getData()
    setOpen(false)

  }
  useEffect(() => {
    const getData = async () => {
      const { data: clients, error } = await supabase.from('clients').select('*')
      setClients(clients)

    }
    getData()
  }, [])
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger><Button onClick={() => setOpen(true)}><FaPlus className="mr-2" />Create new workout plan</Button></SheetTrigger>
      <SheetContent side={"right"} style={{ maxWidth: '50vw' }}>
        <SheetHeader>
          <SheetTitle>Add new workout plan</SheetTitle>
          <SheetDescription>
            Create a new workout plan
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Plan name
            </Label>
            <Input
              id="name"
              placeholder=""
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Client
            </Label>
            <Select  onValueChange={value => setClientId(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => {
                  return <SelectItem value={client.id} key={client.id}>{client.first_name} {client.last_name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={() => insertWorkoutPlan()}>Create New</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

  )
}

export default WorkoutplanDialog