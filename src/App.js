import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/app.css'
//import { withAuthenticator } from '@aws-amplify/ui-react'
//import '@aws-amplify/ui-react/styles.css'
import Header from './components/Header'
import Topics from './components/Topics'

function App() {
  const [language, setLanguage] = useState('de')
  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} />
      <div className="Content">
        <Topics language={language} />
      </div>
    </div>
  )
}

export default App
