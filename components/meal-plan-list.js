'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FaSpinner, FaTrash, FaEye } from 'react-icons/fa'

const MealPlanList = ({ getData, mealPlans }) => {
  const [loading, setLoading] = useState(null)
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  const deleteMealPlan = async (id) => {
    setLoading(id)
    const { error } = await supabase.from('meal-plans').delete().eq('id', id)
    if (!error) {
      getData()
    }
    setLoading(null)
  }

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Meal plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Table>
              <TableCaption>A list of your Meal Plans.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealPlans?.map(mealPlan => (
                  <TableRow key={mealPlan.id}>
                    <TableCell>{mealPlan.name}</TableCell>
                    <TableCell>{mealPlan.description}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-4'>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={mealPlan.clients.avatar_url} alt="Avatar" />
                          <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        {mealPlan.clients.first_name} {mealPlan.clients.last_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => router.push('/meal-plans/' + mealPlan.id)}>
                          <FaEye className="mr-2" />
                          View
                        </Button>
                        <Button
                          onClick={() => deleteMealPlan(mealPlan.id)}
                          variant='destructive'
                          disabled={loading === mealPlan.id}
                        >
                          {loading === mealPlan.id ? <FaSpinner className="animate-spin" /> : <FaTrash className="mr-2" />}
                          {loading === mealPlan.id ? '' : 'Delete'}
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

export default MealPlanList
