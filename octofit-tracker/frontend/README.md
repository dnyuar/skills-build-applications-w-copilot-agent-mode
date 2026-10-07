# OctoFit Tracker frontend

The presentation tier is a React 19 application built with Vite. It uses
`react-router-dom` for navigation and Bootstrap for layout and styling.

## API configuration

The frontend calls the API on port `8000`. For direct API access in Codespaces,
`VITE_CODESPACE_NAME` must be defined with the current Codespace name so Vite
can build the API URL as `https://$VITE_CODESPACE_NAME-8000.app.github.dev`.

For local Codespaces development, create `octofit-tracker/frontend/.env.local`
and set:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart the Vite dev server after changing the environment file. If
`VITE_CODESPACE_NAME` is unset or blank, the frontend safely falls back to
`http://localhost:8000`. In Vite development mode, requests instead use the
same-origin `/api` path and Vite proxies them to `http://localhost:8000`, which
also avoids cross-origin browser restrictions.

## Development

Start the backend API on port `8000` and the MongoDB service before loading
collection pages. Run the frontend development server with `npm run dev` from
this directory. Build the production frontend with `npm run build`.
