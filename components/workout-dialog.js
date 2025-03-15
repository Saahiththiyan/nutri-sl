'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}><FaPlus className="mr-2" />Add new workout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new workout</DialogTitle>
          <DialogDescription>
            Create a new workout
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
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
            <Label htmlFor="name" className="text-right">
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
            <Label htmlFor="name" className="text-right">
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
            <Label htmlFor="name" className="text-right">
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
        <DialogFooter>
          <Button type="submit" onClick={() => insertWorkout()}>Create New</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default WorkoutDialog