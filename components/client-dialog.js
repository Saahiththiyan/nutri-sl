'use client'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
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
import { FaPlus } from 'react-icons/fa'
import { Textarea } from './ui/textarea'

const ClientDialog = ({getData}) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState()
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState(0)
  const [ristrictions, setRistrictions] = useState('')
  const [healthIssues, setHealthIssues] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [targetWeight, setTargetWeight] = useState('')
  const [open, setOpen] = useState(false)
  const insertClient = async () => {
    const password = `${firstname}1234`
    const { data: clientData, error: clientError } = await supabase
    .from('clients')
    .insert([
      { first_name: firstname, last_name: lastname, email: email, age: age, gender: gender, health_issues: healthIssues, ristrictions: ristrictions, current_weight: weight, weight_goal: targetWeight, height: height },
    ])
    .select()
    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })
    console.log(userData);
    const { data: dataProfile, error: errorProfile } = await supabase
    .from('profiles')
    .update({ username: firstname, full_name: `${firstname} ${lastname}`, client_id: clientData[0].id }) // replace with actual fields to update
    .eq('id', userData.user.id);
    console.log('insert client');
    getData()
    setOpen(false)
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)}><FaPlus className="mr-2" />Create a new client</Button>
      </SheetTrigger>
      <SheetContent side={"right"} style={{ maxWidth: '50vw' }}>
        <SheetHeader>
          <SheetTitle>Add new client</SheetTitle>
          <SheetDescription>
            Create a new client to train
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-left">
              First name
            </Label>
            <Input
              id="name"
              placeholder="John"
              className="col-span-3"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-left">
              Last name
            </Label>
            <Input
              id="name"
              placeholder="Doe"
              className="col-span-3"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              placeholder="doe@gmail.com"
              type='email'
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-left">
              Age
            </Label>
            <Input
              id="age"
              className="col-span-3"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-left">
              Gender
            </Label>
            <Select onValueChange={value => setGender(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={0}>Male</SelectItem>
                <SelectItem value={1}>Female</SelectItem>
                <SelectItem value={2}>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-left">
              Current weight
            </Label>
            <Input
              id="weight"
              className="col-span-3"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetWeight" className="text-left">
              Target weight
            </Label>
            <Input
              id="targetWeight"
              className="col-span-3"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-left">
              Height
            </Label>
            <Input
              id="height"
              className="col-span-3"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ristrictions" className="text-left">Dietary ristrictions</Label>
            <Textarea id="ristrictions" className="col-span-3" value={ristrictions} onChange={(e) => setRistrictions(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="healthIssues" className="text-left">Known health issues</Label>
            <Textarea id="healthIssues" className="col-span-3" value={healthIssues} onChange={(e) => setHealthIssues(e.target.value)} />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={insertClient}><FaPlus className="mr-2" />Add</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ClientDialog