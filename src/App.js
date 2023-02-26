import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Signin from './scenes/Signin.js';
import GamerProfile from './scenes/GamerProfile.js';
import AccountPage from './scenes/AccountPage.js';
import './styles/App.css';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/gamerprofile' element={<GamerProfile />}/>
          <Route path='/account' element={<AccountPage />}/>
        </Routes>
    </>
  );
}

export default App;
