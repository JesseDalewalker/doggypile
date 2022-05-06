import './App.scss';
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
// -about
import AboutPage from './pages/about/AboutPage';
// -contact us
import ContactUsPage from './pages/contact/ContactUsPage';
// -map
import MapPage from './pages/map/MapPage'
import AlternateMap from './pages/map/AlternateMap';
// -users
import ProfilePage from './pages/user/ProfilePage';
import CreateProfilePage from './pages/user/CreateProfilePage';
import EditProfilePage from './pages/user/EditProfilePage';
// -calendar
import BigCalendar from './components/calendar/BigCalendar';
// -dogs
// import DogProfilePage from './pages/dogs/DogProfilePage';
import CreateDogProfile from './pages/dogs/CreateDogProfilePage';
import EditDogProfile from './pages/dogs/EditDogProfilePage';
// -posts
import CreatePostPage from './components/posts/createpost';
import EditPostPage from './components/posts/editpost';
// -extra pages
import Doggy101 from './pages/extra-pages/Doggy101';
import LocalUsers from './pages/extra-pages/LocalUsers';
// -footer
import Footer from './components/footer/Footer';
import { Calendar } from 'react-big-calendar';

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
          <Route path="/feed" element={ <FeedPage username={ username } /> } />
          {/* About */}
          <Route path="/about" element={ <AboutPage /> } />
          {/* Contact Us */}
          <Route path="/contact-us" element={ <ContactUsPage /> } />
          {/* Map */}
          <Route path="/mappage" element={<MapPage username={ username } />} />
          <Route path="/alternatemappage" element={<AlternateMap />} />
          {/* Users */}
          <Route path="/profile/:userId" element={<ProfilePage username= { username } />} />
          <Route path="/profile/:userId/create-profile" element={<CreateProfilePage username= { username } />} />
          <Route path="/profile/:userId/edit-profile" element={<EditProfilePage username= { username } />} />
          {/* Calendar */}
          <Route path="/calendar" element={ <BigCalendar/> } />
          {/* Dogs */}
          <Route path="/dog-profile/create-profile" element={<CreateDogProfile username= { username } />} />
          <Route path="/dog-profile/:dogId/edit-profile" element={<EditDogProfile username= { username } />} />
          {/*Posts */}
          <Route path="/post/create-post" element={<CreatePostPage username= { username } />} />
          <Route path="/post/:id" element={<EditPostPage username= { username } />} />
          {/*extra pages */}
          <Route path="/doggy101" element={<Doggy101 />} />
          <Route path="/localUsers" element={<LocalUsers username={ username }/>} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
