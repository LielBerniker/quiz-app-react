import React from "react"
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import GamePage from "./components/GamePage"
import ScorePage from "./components/ScorePage"
function App() {
   
    return (
        <div>
     <Router>
         <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/play" element={<GamePage />}/>
          <Route path="/final" element={<ScorePage />}/>
         </Routes>
     </Router>
     </div>
    );
  
}

export default App;