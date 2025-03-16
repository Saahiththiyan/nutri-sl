'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { supabase } from '@/lib/supabase'
import { FaPlus } from 'react-icons/fa'

const WorkoutDialog = ({getData, workoutPlanId}) => {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [duration, setDuration] = useState('')
  const [open, setOpen] = useState(false);
  
  const insertWorkout = async () => {
    const { data, error } = await supabase
    .from('workouts')
    .insert([
      { name: name, sets: sets, reps: reps, duration: duration, workout_plan_id: workoutPlanId }
    ])
    .select()
    getData()
    setOpen(false)

  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger><Button onClick={() => setOpen(true)}><FaPlus className="mr-2" />Add new workout</Button></SheetTrigger>
    <SheetContent side={"right"} style={{ maxWidth: '50vw' }}>
      <SheetHeader>
        <SheetTitle>Add new workout</SheetTitle>
        <SheetDescription>
          Create a new workout
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Workout name
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
              No of Sets
            </Label>
            <Input
              id="name"
              placeholder=""
              className="col-span-3"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              No of Reps
            </Label>
            <Input
              id="name"
              placeholder=""
              className="col-span-3"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Duration (mins)
            </Label>
            <Input
              id="name"
              placeholder=""
              className="col-span-3"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          
        </div>
      <SheetFooter>
        <Button type="submit" onClick={() => insertWorkout()}>Create New</Button>
      </SheetFooter>
    </SheetContent>
    </Sheet>

  )
}

export default WorkoutDialog