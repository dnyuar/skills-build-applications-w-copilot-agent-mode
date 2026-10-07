import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Athlete', value: (activity) => activity.user?.displayName ?? activity.user?.username },
  { heading: 'Team', value: (activity) => activity.team?.name },
  { heading: 'Activity', value: (activity) => activity.type },
  { heading: 'Duration', value: (activity) => `${activity.durationMinutes} min` },
  { heading: 'Calories', value: (activity) => activity.caloriesBurned },
  {
    heading: 'Date',
    value: (activity) => activity.date
      ? new Date(activity.date).toLocaleDateString()
      : undefined,
  },
]

export default function Activities() {
  return <CollectionPage title="Activities" endpoint="/api/activities/" columns={columns} />
}
