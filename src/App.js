import React from "react"
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import GamePage from "./components/GamePage"
function App() {
   
    return (
        <div>
     <Router>
         <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/play" element={<GamePage />}/>
         </Routes>
     </Router>
     </div>
    );
  
}

export default App;