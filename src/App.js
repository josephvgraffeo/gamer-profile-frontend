import { Routes, Route } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext.js';
import Navbar from './components/Navbar.js';
import Signup from './scenes/Signup.js';
import Login from './scenes/Login.js';
import GamerProfile from './scenes/GamerProfile.js';
import AccountPage from './scenes/AccountPage.js';
import ProtectedRoute from './components/ProtectedRoutes.js';
import Welcome from './scenes/Welcome.js';
import ContactPage from './scenes/ContactPage.js';
import './styles/App.css';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/gamerprofile' element={<ProtectedRoute><GamerProfile /></ProtectedRoute>} />
          <Route path='/account' element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
