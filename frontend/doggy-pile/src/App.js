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
import MapPage from './pages/map/MapPage'
// users
import ProfilePage from './pages/user/ProfilePage';
import CreateProfilePage from './pages/user/CreateProfilePage';
import EditProfilePage from './pages/user/EditProfilePage';

function App() {
  // state
  const [username, setUsername] = useState("") // returns dict: {username: 'username', user_id: id }
  console.log("USER DATA",username)

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
          <Route path="/mappage" element={<MapPage />} />
          {/* Users */}
          <Route path="/profile" element={<ProfilePage username= { username } />} />
          <Route path="/profile/create-profile" element={<CreateProfilePage username= { username } />} />
          <Route path="/profile/edit-profile" element={<EditProfilePage username= { username } />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
