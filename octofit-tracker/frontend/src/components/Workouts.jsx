import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Workout', value: (workout) => workout.title },
  { heading: 'Description', value: (workout) => workout.description },
  { heading: 'Difficulty', value: (workout) => workout.difficulty },
  { heading: 'Duration', value: (workout) => `${workout.durationMinutes} min` },
  {
    heading: 'Equipment',
    value: (workout) => Array.isArray(workout.equipment) ? workout.equipment.join(', ') : undefined,
  },
]

export default function Workouts() {
  return <CollectionPage title="Workouts" endpoint="/api/workouts/" columns={columns} />
}
