const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : import.meta.env.DEV
    ? ''
    : 'http://localhost:8000'

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  throw new Error('The API returned an unsupported collection response.')
}

export async function fetchCollection(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText}).`)
  }

  return getCollectionItems(await response.json())
}
