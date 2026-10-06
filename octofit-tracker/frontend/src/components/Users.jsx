import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Name', value: (user) => user.displayName },
  { heading: 'Username', value: (user) => user.username },
  { heading: 'Email', value: (user) => user.email },
  { heading: 'Team', value: (user) => user.team?.name },
]

export default function Users() {
  return <CollectionPage title="Users" endpoint="/api/users/" columns={columns} />
}
