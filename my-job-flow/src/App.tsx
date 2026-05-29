import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import NewJob from "./pages/NewJob"
import Configurations from "./pages/Configurations"

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'new-job',
        element: <NewJob />
      },
      {
        path: 'configurations',
        element: <Configurations />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
