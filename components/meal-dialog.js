'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { supabase } from '@/lib/supabase'
import { Textarea } from './ui/textarea'
import { FaPlus } from 'react-icons/fa'

const MealDialog = ({getData, mealPlanId}) => {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [preparationMethod, setPreparationMethod] = useState('')
  const [servingSize, setServingSize] = useState('')
  const [dietaryPreference, setDietaryPreference] = useState('')
  const [mealTime, setMealTime] = useState('')
  const [notes, setNotes] = useState('')
  const [image, setImage] = useState(null)
  const [open, setOpen] = useState(false)
  
  const handleImageUpload = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `meals/${fileName}`

    let { error: uploadError } = await supabase.storage
      .from('fitsl')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('fitsl')
      .getPublicUrl(filePath)

    console.log(data.publicUrl);

    return data.publicUrl
  }

  const insertMeal = async () => {
    let imageUrl = null
    if (image) {
      try {
        imageUrl = await handleImageUpload(image)
      } catch (error) {
        console.error('Error uploading image:', error)
        return
      }
    }
    const { data, error } = await supabase
    .from('meals')
    .insert([
      { name, weight, calories, protein, carbs, fat, ingredients, preparation_method: preparationMethod, 
        serving_size: servingSize, dietary_preference: dietaryPreference, meal_time: mealTime, notes, 
        image_url: imageUrl, meal_plan_id: mealPlanId  }
    ])
    .select()
    if (error) {
      console.error('Error inserting meal:', error)
    } else {
      getData()
      setOpen(false)
    }

  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}><FaPlus className="mr-2" />Add new meal</Button>
      </DialogTrigger>
      <DialogContent style={{ width: '80vw', maxWidth: '1200px', height: '80vh', maxHeight: '800px' }}>
        <DialogHeader>
          <DialogTitle>Add new meal</DialogTitle>
          <DialogDescription>
            Create a new meal
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Meal name</Label>
              <Input id="name" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">Weight</Label>
              <Input id="weight" className="col-span-3" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calories" className="text-right">Calories</Label>
              <Input id="calories" className="col-span-3" value={calories} onChange={(e) => setCalories(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="protein" className="text-right">Protein (g)</Label>
              <Input id="protein" className="col-span-3" value={protein} onChange={(e) => setProtein(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carbs" className="text-right">Carbs (g)</Label>
              <Input id="carbs" className="col-span-3" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fat" className="text-right">Fat (g)</Label>
              <Input id="fat" className="col-span-3" value={fat} onChange={(e) => setFat(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right">Ingredients</Label>
              <Textarea id="ingredients" className="col-span-3" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preparationMethod" className="text-right">Preparation Method</Label>
              <Textarea id="preparationMethod" className="col-span-3" value={preparationMethod} onChange={(e) => setPreparationMethod(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servingSize" className="text-right">Serving Size</Label>
              <Input id="servingSize" className="col-span-3" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dietaryPreference" className="text-right">Dietary Preference</Label>
              <Input id="dietaryPreference" className="col-span-3" value={dietaryPreference} onChange={(e) => setDietaryPreference(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mealTime" className="text-right">Meal Time</Label>
              <Input id="mealTime" className="col-span-3" value={mealTime} onChange={(e) => setMealTime(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea id="notes" className="col-span-3" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image</Label>
              <Input type="file" id="image" className="col-span-3" onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => insertMeal()}>Create New</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default MealDialog