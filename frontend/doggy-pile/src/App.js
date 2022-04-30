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
import MapPage from './pages/home/MapPage'

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
<<<<<<< HEAD
          {/* Map */}
          <Route path="/map" element={<Map />} />
=======

          <Route path="/mappage" element={<MapPage />} />
>>>>>>> 80bef2421c54a8fdf71a405932919e6d88539e81

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
