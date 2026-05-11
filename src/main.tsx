import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, Network } from "relay-runtime";
import type { FetchFunction } from "relay-runtime";

const HTTP_ENDPOINT = "https://api.digitransit.fi/routing/v2/waltti/gtfs/v1";

// TODO automaattinen refresh 30sec välein, tallenna edellinen query siltä varalta että uutta ei tule

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { 
                "Content-Type": "application/json", 
                "digitransit-subscription-key": "d1eb6171787a438da318f75663cf63fd"
              },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </StrictMode>
);
