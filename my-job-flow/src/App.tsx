import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import NewJob from "./pages/NewJob"
import Configurations from "./pages/Configurations"
import JobDetails from "./pages/JobDetails"
import ArchivedJobs from "./pages/ArchivedJobs"

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
      },
      {
        path: 'archived',
        element: <ArchivedJobs />
      },
      {
        path: 'job/:id',
        element: <JobDetails />
      }
    ]
  }
])

import { ToastProvider } from './contexts/ToastContext'
import { ModalProvider } from './contexts/ModalContext'

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ToastProvider>
  )
}

export default App
