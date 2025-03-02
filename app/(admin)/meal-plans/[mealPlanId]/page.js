'use client'
import React, { useState } from 'react'
import {supabase} from '@/lib/supabase'
import MealDialog from '@/components/meal-dialog'
import MealList from '@/components/meal-list'

const MealPlan = ({params}) => {
  const [meals, setMeals] = useState(null)
  const getData = async () => {
    const { data: meals, error } = await supabase.from('meals').select('*').eq('meal_plan_id', params.mealPlanId)
    setMeals(meals)
  }
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">Clients</h2> */}
          <div className="flex items-center space-x-2">
            <MealDialog getData={() => getData()} mealPlanId={params.mealPlanId}/>
            
          </div>
        </div>
        <MealList getData={() => getData()} meals={meals}/>
      </main>
    </>
  )
}

export default MealPlan