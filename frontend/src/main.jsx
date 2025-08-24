import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import Landingpage from './components/Landingpage.jsx'
import Home from './components/Home.jsx'
import TopChoices from './components/TopChoices.jsx'
import Itinerary from './components/Itinerary.jsx'
import MainLayout from './components/MainLayout.jsx'
import LoaderPage from './components/LoaderPage.jsx'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Store.js";

// DO NOT import RouterProvider again or router from './router' here!

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage />,
  },
  {
    path: "/loader",
    element: <LoaderPage />,
  },
  {
    path: "/home",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "top-choices",
        element: <TopChoices />,
      },
      {
        path: "itinerary/:tripId",
        element: <Itinerary />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
)
