import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Codigo from './components/Codigo'
import Tablas from './components/Tablas'
import Arbol from './components/Arbol'
import NavBar from'./components/NavBar'


function App() {
  
  return (
      
      <Router>
        <NavBar></NavBar>
        <Route path="/codigo" component={Codigo}/>
        <Route path="/tablas" component={Tablas}/>
        <Route path="/arbol" component={Arbol}/>
      </Router>
      
  )
}

export default App

