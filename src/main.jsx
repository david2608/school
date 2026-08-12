import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './styles.css'
import './cultural.css'
import {AuthProvider} from './lib/auth'
import {StudentProvider} from './lib/student'
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><AuthProvider><StudentProvider><App/></StudentProvider></AuthProvider></BrowserRouter></React.StrictMode>)
