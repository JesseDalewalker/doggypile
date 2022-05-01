import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

// Components
import NavBar from './components/nav/NavBar';

// Pages
// -authenticate
import SignUpPage from './pages/authenticate/SignUpPage';
import LoginPage from './pages/authenticate/LoginPage';
// -home
import LandingPage from './pages/home/LandingPage';
import FeedPage from './pages/home/FeedPage';
// -map
import MapPage from './pages/map/MapPage'
// -users
import ProfilePage from './pages/user/ProfilePage';
import CreateProfilePage from './pages/user/CreateProfilePage';
import EditProfilePage from './pages/user/EditProfilePage';
// -dogs
import DogProfilePage from './pages/dogs/DogProfilePage';
import CreateDogProfile from './pages/dogs/CreateDogProfilePage';
import EditDogProfile from './pages/dogs/EditDogProfilePage';

function App() {
  // state
  const [username, setUsername] = useState("") // returns dict: {username: 'username', user_id: id }
  // console.log("USER DATA",username)

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
          <Route path="/feed" element={ <FeedPage /> } />
          {/* Map */}
          <Route path="/mappage" element={<MapPage />} />
          {/* Users */}
          <Route path="/profile/:userId" element={<ProfilePage username= { username } />} />
          <Route path="/profile/:userId/create-profile" element={<CreateProfilePage username= { username } />} />
          <Route path="/profile/userId/edit-profile" element={<EditProfilePage username= { username } />} />
          {/* Dogs */}
          <Route path="/dog-profile/:dogId" element={<DogProfilePage username= { username } />} />
          <Route path="/dog-profile/:dogId/create-profile" element={<CreateDogProfile username= { username } />} />
          <Route path="/dog-profile/:dogId/edit-profile" element={<EditDogProfile username= { username } />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
