import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskPage from './TaskPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskPage />
  </StrictMode>,
)
