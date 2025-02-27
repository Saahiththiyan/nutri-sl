import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const workouts = [
  {
    id: 1,
    name: 'Jumping rope',
    sets: 15,
    reps: 3
  },
  {
    id: 2,
    name: 'Situps',
    sets: 4,
    reps: 6
  }
]

export default function Home () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid grid-cols-3 gap-8'>
        {workouts.map(workout => {
          return (
            <Card key={workout.id}>
              <CardHeader>
                <CardTitle>{workout.name}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sets: {workout.name}</p>
                <p>Reps: {workout.reps}</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          )
        })}

      </div>

    </main>
  )
}
