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
import { supabase } from '@/lib/supabase'
import { FaSpinner, FaTrash, FaEye } from 'react-icons/fa'

const WorkoutList = ({ getData, workouts }) => {
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const deleteWorkout = async (id) => {
    setLoading(id)
    const { error } = await supabase.from('workouts').delete().eq('id', id)
    if (!error) {
      getData()
    }
    setLoading(null)
  }

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Table>
              <TableCaption>A list of your Workouts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Workout</TableHead>
                  <TableHead>Sets</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workouts?.map(workout => (
                  <TableRow key={workout.id}>
                    <TableCell>{workout.name}</TableCell>
                    <TableCell>{workout.sets}</TableCell>
                    <TableCell>{workout.reps}</TableCell>
                    <TableCell>{workout.duration && `${workout.duration} min`}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button
                          onClick={() => deleteWorkout(workout.id)}
                          variant='destructive'
                          disabled={loading === workout.id}
                        >
                          {loading === workout.id ? <FaSpinner className="animate-spin" /> : <FaTrash className="mr-2" />}
                          {loading === workout.id ? '' : 'Delete'}
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

export default WorkoutList
