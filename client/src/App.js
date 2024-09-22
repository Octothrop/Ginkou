import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from "./login-register/login";
import RegisterComponent from "./login-register/register";
import Home from "./main/home";
import AdminPage from './admin-panel/admin';
import UserPage from './user-panel/user';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;