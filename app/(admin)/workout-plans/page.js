'use client'
import WorkoutplanDialog from '@/components/workout-plan-dialog'
import WorkoutPlanList from '@/components/workout-plan-list'
import React, { useState } from 'react'
import {supabase} from '@/lib/supabase'

const WorkoutPlans = () => {
  const [workoutPlans, setWorkoutPlans] = useState(null)
  const getData = async () => {
    const { data: workoutPlans, error } = await supabase.from('workout-plans').select('*, clients(*)')
    setWorkoutPlans(workoutPlans)
  }
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">Clients</h2> */}
          <div className="flex items-center space-x-2">
            <WorkoutplanDialog getData={() => getData()}/>
            
          </div>
        </div>
        <WorkoutPlanList getData={() => getData()} workoutPlans={workoutPlans}/>
      </main>
    </>
  )
}

export default WorkoutPlans