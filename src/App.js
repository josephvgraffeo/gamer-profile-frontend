import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Signup from './scenes/Signup.js';
import Login from './scenes/Login.js';
import GamerProfile from './scenes/GamerProfile.js';
import AccountPage from './scenes/AccountPage.js';
import './styles/App.css';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/' element={<Signup />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/gamerprofile' element={<GamerProfile />}/>
          <Route path='/account' element={<AccountPage />}/>
        </Routes>
    </>
  );
}

export default App;
