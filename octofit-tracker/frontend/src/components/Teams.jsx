import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Team', value: (team) => team.name },
  { heading: 'Description', value: (team) => team.description },
  {
    heading: 'Members',
    value: (team) => Array.isArray(team.members) ? team.members.length : undefined,
  },
]

export default function Teams() {
  return <CollectionPage title="Teams" endpoint="/api/teams/" columns={columns} />
}
