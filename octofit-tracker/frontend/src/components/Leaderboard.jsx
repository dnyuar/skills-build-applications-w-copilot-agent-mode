import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Rank', value: (entry) => entry.rank },
  { heading: 'Athlete', value: (entry) => entry.user?.displayName ?? entry.user?.username },
  { heading: 'Team', value: (entry) => entry.team?.name },
  { heading: 'Points', value: (entry) => entry.points },
]

export default function Leaderboard() {
  return <CollectionPage title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} />
}
