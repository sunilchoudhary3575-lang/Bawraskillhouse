import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MediaProvider } from './context/MediaContext'
import ErrorBoundary from './components/ErrorBoundary'
import './firebase.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <MediaProvider>
        <App />
      </MediaProvider>
    </ErrorBoundary>
  </StrictMode>,
)


