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
import { mealTypes } from '@/data/util'
import { FaSpinner, FaTrash, FaEye } from 'react-icons/fa'

const MealList = ({ getData, meals }) => {
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const deleteMeal = async (id) => {
    setLoading(id)
    const { error } = await supabase.from('meals').delete().eq('id', id)
    if (!error) {
      getData()
    }
    setLoading(null)
  }

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Table>
              <TableCaption>A list of meals.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Meal</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Dietary Preference</TableHead>
                  <TableHead>Ingredients</TableHead>
                  <TableHead>Preparation Method</TableHead>
                  <TableHead>Serving Size</TableHead>
                  <TableHead>Protein</TableHead>
                  <TableHead>Carbs</TableHead>
                  <TableHead>Fat</TableHead>
                  <TableHead>Meal Time</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meals?.map(meal => (
                  <TableRow key={meal.id}>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell>{mealTypes.find(mealtype => mealtype.id === meal.type)?.name}</TableCell>
                    <TableCell>{meal.weight}g</TableCell>
                    <TableCell>{meal.dietary_preference}</TableCell>
                    <TableCell>{meal.ingredients}</TableCell>
                    <TableCell>{meal.preparation_method}</TableCell>
                    <TableCell>{meal.serving_size}</TableCell>
                    <TableCell>{meal.protein}</TableCell>
                    <TableCell>{meal.carbs}</TableCell>
                    <TableCell>{meal.fat}</TableCell>
                    <TableCell>{meal.fat}</TableCell>
                    <TableCell>{meal.meal_time}</TableCell>
                    <TableCell>{meal.notes}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button
                          onClick={() => deleteMeal(meal.id)}
                          variant='destructive'
                          disabled={loading === meal.id}
                        >
                          {loading === meal.id ? <FaSpinner className="animate-spin" /> : <FaTrash className="mr-2" />}
                          {loading === meal.id ? '' : 'Delete'}
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

export default MealList
