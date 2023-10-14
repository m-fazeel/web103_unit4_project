import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewItems'
import EditCar from './pages/EditItem'
import CreateCar from './pages/CreateItem'
import CarDetails from './pages/ItemDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='Customer Computers | Customize' />
    },
    {
      path:'/customitems',
      element: <ViewCars title='Customer Computers | Custom Cars' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='Customer Computers | View' />
    },
    {
      path: '/customitems/edit/:id',
      element: <EditCar title='Customer Computers| Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App