import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

// Components
import NavBar from './components/nav/NavBar';

// Pages
// authenticate
import SignUpPage from './pages/authenticate/SignUpPage';
import LoginPage from './pages/authenticate/LoginPage';
// home
import LandingPage from './pages/home/LandingPage';
// map
import Map from './pages/map/Map.js'


function App() {
  // state
  const [username, setUsername] = useState("")

  return (
    <div className="App">
      <HashRouter>
        <NavBar username= { username } setUsername={ setUsername }/>
        <Routes>
          {/* Authenticate */}
          <Route path="/signup" element={ <SignUpPage /> } />
          <Route path="/login" element={ <LoginPage setUsername={ setUsername }/> } />
          {/* Home */}
          <Route path="/" element={ <LandingPage /> } />
          {/* Map */}
          <Route path="/map" element={<Map />} />

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
