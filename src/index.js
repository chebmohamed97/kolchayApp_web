import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { DeviceWidthProvider } from './contexts/WidthContext'
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
        <DeviceWidthProvider>
            <App />
        </DeviceWidthProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)