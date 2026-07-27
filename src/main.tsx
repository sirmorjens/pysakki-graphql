import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, Network, Store, RecordSource } from "relay-runtime";
import type { FetchFunction } from "relay-runtime";

const HTTP_ENDPOINT = "https://api.digitransit.fi/routing/v2/waltti/gtfs/v1";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  try{
    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: { 
                  "Content-Type": "application/json", 
                  "digitransit-subscription-key": import.meta.env.VITE_DIGITRANSIT_SUBSCRIPTION_KEY
                },
      body: JSON.stringify({ query: request.text, variables }),
    })
    if (!resp.ok) {
      throw new Error("Response failed.");
    }
    return await resp.json();
  }
  catch (e: any)
  {
    console.error("Fetch failed")
    return {error: "Error"}
  }
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource())
});

createRoot(document.getElementById("root")!).render(

    <RelayEnvironmentProvider environment={environment}>
        <App />
    </RelayEnvironmentProvider>

);
