import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from "./login-register/login";
import RegisterComponent from "./login-register/register";
import Home from "./main/home";
import CardDisplay from './user-panel/cards';
import TransactionDisplay from './user-panel/transaction';
import Accounts from './admin-panel/accounts';
import TransactionDisplayAll from './admin-panel/Transactions_all';
import AccountDisplay from './user-panel/account';
import ForgotPassword from './user-panel/changePassword';
import Users from './admin-panel/users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/:userId?/:user?" element={<Home />} />
        <Route path="/manage/accounts" element={<Accounts />} />
        <Route path="/manage/transactions" element={<TransactionDisplayAll />} />
        <Route path="/manage/users" element={<Users />} />
        <Route path="/cards/:userId" element={<CardDisplay />} />
        <Route path="/history/:userId" element={<TransactionDisplay />} />
        <Route path="/accounts/:userId" element={<AccountDisplay />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;