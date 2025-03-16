'use client'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Description } from '@radix-ui/react-dialog'
import { Textarea } from './ui/textarea'
import { FaPlus } from 'react-icons/fa'

const MealPlanDialog = ({getData}) => {
  const [name, setName] = useState('')
  const [clientId, setClientId] = useState('')
  const [clients, setClients] = useState([])
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState(null)

  const handleImageUpload = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `meal-plans/${fileName}`

    let { error: uploadError } = await supabase.storage
      .from('fitsl')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('fitsl')
      .getPublicUrl(filePath)

    console.log(data.publicUrl);

    return data.publicUrl
  }

  const insertWorkoutPlan = async () => {
    let imageUrl = null
    if (image) {
      try {
        imageUrl = await handleImageUpload(image)
      } catch (error) {
        console.error('Error uploading image:', error)
        return
      }
    }

    const { data, error } = await supabase
    .from('meal-plans')
    .insert([
      { name: name, client_id: clientId, image_url: imageUrl, description }
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
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)}><FaPlus className="mr-2" />Create a new meal plan</Button>
      </SheetTrigger>
      <SheetContent side={"right"} style={{ maxWidth: '50vw' }}>
        <SheetHeader>
          <SheetTitle>Add new meal plan</SheetTitle>
          <SheetDescription>
            Create a new meal plan
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
            <Select onValueChange={value => setClientId(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => {
                  return <SelectItem value={client.id} key={client.id}>{client.first_name} {client.last_name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left">Description</Label>
              <Textarea id="description" className="col-span-3" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-left">Image</Label>
            <Input type="file" id="image" className="col-span-3" onChange={(e) => setImage(e.target.files[0])} />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={() => insertWorkoutPlan()}>Create New</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MealPlanDialog