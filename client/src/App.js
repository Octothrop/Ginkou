import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./error/NotFound";

// Lazy loading components
const LoginComponent = lazy(() => import("./login-register/login"));
const RegisterComponent = lazy(() => import("./login-register/register"));
const Home = lazy(() => import("./main/home"));
const CardDisplay = lazy(() => import("./user-panel/cards"));
const TransactionDisplay = lazy(() => import("./user-panel/transaction"));
const Accounts = lazy(() => import("./admin-panel/accounts"));
const TransactionDisplayAll = lazy(() =>
  import("./admin-panel/Transactions_all")
);
const AccountDisplay = lazy(() => import("./user-panel/account"));
const ForgotPassword = lazy(() => import("./user-panel/changePassword"));
const Users = lazy(() => import("./admin-panel/users"));
const Pay = lazy(() => import("./payment/payPage"));
const CardPay = lazy(() => import("./payment/cardPayPage"));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/:userId?/:user?" element={<Home />} />
            <Route path="/manage/accounts" element={<Accounts />} />
            <Route
              path="/manage/transactions"
              element={<TransactionDisplayAll />}
            />
            <Route path="/manage/users" element={<Users />} />
            <Route path="/cards/:userId" element={<CardDisplay />} />
            <Route path="/history/:userId" element={<TransactionDisplay />} />
            <Route path="/accounts/:userId" element={<AccountDisplay />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/ginkou/payment/:userId?/:user?" element={<Pay />} />
            <Route path="/ginkou/card/payment/:userId?/:user?" element={<CardPay />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
