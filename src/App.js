import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Signup from './scenes/Signup.js';
import Login from './scenes/Login.js';
import GamerProfile from './scenes/GamerProfile.js';
import AccountPage from './scenes/AccountPage.js';
import ProtectedRoute from './components/ProtectedRoutes.js';
import WelcomePage from './scenes/Welcome.js';
import './styles/App.css';
import { AuthContextProvider } from './context/AuthContext.js';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/gamerprofile' element={<ProtectedRoute><GamerProfile /></ProtectedRoute>} />
          <Route path='/account' element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
