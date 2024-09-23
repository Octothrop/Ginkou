import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from "./login-register/login";
import RegisterComponent from "./login-register/register";
import Home from "./main/home";
import AdminPage from './admin-panel/admin';
import UserPage from './user-panel/user';
import CardDisplay from './user-panel/cards';
import TransactionDisplay from './user-panel/transaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/cards/:id" element={<CardDisplay />} />
        <Route path="/history/:userId" element={<TransactionDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;