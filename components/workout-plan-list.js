'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FaSpinner, FaTrash, FaEye } from 'react-icons/fa'

const WorkoutPlanList = ({ getData, workoutPlans }) => {
  const [loading, setLoading] = useState(null)
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  const deleteWorkoutPlan = async (id) => {
    setLoading(id)
    const { error } = await supabase.from('workout-plans').delete().eq('id', id)
    if (!error) {
      getData()
    }
    setLoading(null)
  }

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Workout plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Table>
              <TableCaption>A list of your Workout Plans.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workoutPlans?.map(workoutPlan => (
                  <TableRow key={workoutPlan.id}>
                    <TableCell>{workoutPlan.name}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-4'>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={workoutPlan.clients.avatar_url} alt="Avatar" />
                          <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        {workoutPlan.clients.first_name} {workoutPlan.clients.last_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => router.push('/workout-plans/' + workoutPlan.id)}>
                          <FaEye className="mr-2" />
                          View
                        </Button>
                        <Button
                          onClick={() => deleteWorkoutPlan(workoutPlan.id)}
                          variant='destructive'
                          disabled={loading === workoutPlan.id}
                        >
                          {loading === workoutPlan.id ? <FaSpinner className="animate-spin" /> : <FaTrash className="mr-2" />}
                          {loading === workoutPlan.id ? '' : 'Delete'}
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

export default WorkoutPlanList
