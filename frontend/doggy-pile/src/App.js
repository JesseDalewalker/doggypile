import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
// import { useState } from 'react';

// Components
import NavBar from './components/nav/NavBar';

// Pages
import LandingPage from './pages/home/LandingPage';

function App() {
  // state
  // const [username, setUsername] = useState("")

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <Routes>
          {/* Home */}
          <Route path="/" element={ <LandingPage /> } />

          {/* Map */}

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
