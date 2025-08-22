import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landingpage from './components/Landingpage.jsx'
import Home from './components/Home.jsx'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path:"/",
    element: <Landingpage/>
  },
  {
    path:"/home",
    element: <Home/>
  },

])
createRoot(document.getElementById('root')).render(
    <RouterProvider router= { router }/>
)
