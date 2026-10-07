import { useCallback, useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function readValue(item, column) {
  const value = column.value(item)
  return value === null || value === undefined || value === '' ? '—' : value
}

function CollectionPage({ title, endpoint, columns }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        setItems(await fetchCollection(endpoint, controller.signal))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadItems()
    return () => controller.abort()
  }, [endpoint, refreshKey])

  const retry = useCallback(() => setRefreshKey((key) => key + 1), [])

  return (
    <section aria-labelledby="page-title">
      <div className="mb-4">
        <p className="text-uppercase text-secondary small fw-semibold mb-1">OctoFit Tracker</p>
        <h1 className="page-heading h2 mb-0" id="page-title">{title}</h1>
      </div>

      <div className="card data-panel">
        <div className="card-body p-0">
          {loading && (
            <div className="p-4 text-secondary" role="status">
              Loading {title.toLowerCase()}…
            </div>
          )}
          {!loading && error && (
            <div className="alert alert-danger m-3" role="alert">
              <p className="mb-2">Could not load {title.toLowerCase()}: {error}</p>
              <button className="btn btn-sm btn-outline-danger" onClick={retry} type="button">
                Try again
              </button>
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <p className="p-4 mb-0 text-secondary">No {title.toLowerCase()} found.</p>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover data-table mb-0">
                <thead>
                  <tr>
                    {columns.map((column) => <th key={column.heading} scope="col">{column.heading}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id ?? item.id ?? `${endpoint}-${index}`}>
                      {columns.map((column) => (
                        <td key={column.heading}>{readValue(item, column)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CollectionPage
