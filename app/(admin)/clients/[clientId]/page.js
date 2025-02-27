'use client'

import React, { useEffect, useState } from 'react'
import {supabase} from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { genderList } from '@/data/util'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import WeightGraph from '@/components/weight-graph'
import { useRouter } from 'next/navigation'
import Lightbox from 'yet-another-react-lightbox'
import "yet-another-react-lightbox/styles.css";

const Clients = ({params}) => {
  const [client, setClient] = useState(null)
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data: client, error } = await supabase.from('clients').select('*, weight-data(*), meal-plans(*), workout-plans(*)').eq('id', params.clientId).single()
      console.log(client);
      setClient(client)
    }
    getData()
  }, [params.clientId])

  const handleLightBox = (image) => {
    setCurrentImage(image)
    setOpen(true)
  }


  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        {client && (
          <>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name} Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex'>
                <div className="flex-1 space-y-4">
                  <img src={client.avatar_url} alt="" height={150} width={150}/>
                </div>
                <div className="flex-1 space-y-4">
                  <div>Client name: <b>{client.first_name} {client.last_name}</b></div>
                  <div>Gender: <b>{genderList[client.gender]}</b></div>
                  <div>Starting weight: <b>{client.current_weight} kg</b></div>
                  <div>Target weight: <b>{client.weight_goal} kg</b></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>Height: <b>{client.height} cm</b></div>
                  <div>Email: <b>{client.email}</b></div>
                  <div>Health issues: <b>{client.health_issues}</b></div>
                  <div>Dietary restrictions: <b>{client.ristrictions}</b></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name} Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex'>
                  <div className="space-y-4 h-40">
                    <img className="h-full cursor-pointer" src={client.body_image1} alt="" onClick={() => handleLightBox(client.body_image1)}/>
                  </div>
                  <div className="space-y-4 h-40">
                    <img className="h-full cursor-pointer" src={client.body_image2} alt="" onClick={() => handleLightBox(client.body_image2)}/>
                  </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name} Progress (Weight)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex h-96'>
                <WeightGraph data={client['weight-data']}/>
              </div>
            </CardContent>
          </Card>
          <div className='flex gap-8'>
            <Card className="col-span-3 flex-1">
              <CardHeader>
                <CardTitle>Assigned Meal Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of {client.first_name}'s Meal Plans.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client['meal-plans']?.map(mealPlan => {
                      return (
                        <TableRow key={mealPlan.id}>
                          <TableCell>{mealPlan.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-4 justify-end">
                              <Button onClick={() => router.push('/meal-plans/' + mealPlan.id)}>View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-3 flex-1">
              <CardHeader>
                <CardTitle>Assigned Workout Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of {client.first_name}'s Workout Plans.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client['workout-plans']?.map(workoutPlan => {
                      return (
                        <TableRow key={workoutPlan.id}>
                          <TableCell>{workoutPlan.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-4 justify-end">
                              <Button onClick={() => router.push('/workout-plans/' + workoutPlan.id)}>View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          </>
        )}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            { src: currentImage },
          ]}
        />
      </main>
    </>
  )
}

export default Clients
