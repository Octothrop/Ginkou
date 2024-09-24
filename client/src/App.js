import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from "./login-register/login";
import RegisterComponent from "./login-register/register";
import Home from "./main/home";
import CardDisplay from './user-panel/cards';
import TransactionDisplay from './user-panel/transaction';
import Accounts from './admin-panel/accounts';
import TransactionDisplayAll from './admin-panel/Transactions_all';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<Home />} />
        <Route path="/cards/:id" element={<CardDisplay />} />
        <Route path="/history/:userId" element={<TransactionDisplay />} />
        <Route path="/manage/accounts" element={<Accounts />} />
        <Route path="/manage/transactions" element={<TransactionDisplayAll />} />
      </Routes>
    </Router>
  );
}

export default App;