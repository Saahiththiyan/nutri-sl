'use client'
import MealPlanDialog from '@/components/meal-plan-dialog'
import MealPlanList from '@/components/meal-plan-list'
import { supabase } from '@/lib/supabase'
import React, { useState } from 'react'

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState(null)
  const getData = async () => {
    const { data: mealPlans, error } = await supabase.from('meal-plans').select('*, clients(*)')
    setMealPlans(mealPlans)
  }
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">Clients</h2> */}
          <div className="flex items-center space-x-2">
            <MealPlanDialog getData={() => getData()}/>
            
          </div>
        </div>
        <MealPlanList getData={() => getData()} mealPlans={mealPlans}/>
      </main>
    </>
  )
}

export default MealPlans