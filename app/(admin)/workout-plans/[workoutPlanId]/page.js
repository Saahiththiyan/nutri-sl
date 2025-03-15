'use client'
import React, { useState } from 'react'
import {supabase} from '@/lib/supabase'
import WorkoutList from '@/components/workout-list'
import WorkoutDialog from '@/components/workout-dialog'

const WorkoutPlan = ({params}) => {
  const [workouts, setWorkouts] = useState(null)
  const getData = async () => {
    const { data: workouts, error } = await supabase.from('workouts').select('*').eq('workout_plan_id', params.workoutPlanId)
    setWorkouts(workouts)
  }
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">Clients</h2> */}
          <div className="flex items-center space-x-2">
            <WorkoutDialog getData={() => getData()} workoutPlanId={params.workoutPlanId}/>
            
          </div>
        </div>
        <WorkoutList getData={() => getData()} workouts={workouts}/>
      </main>
    </>
  )
}

export default WorkoutPlan