import React from "react";
import queryString from "query-string";
import PaymentPage from "./payment";
import { useLocation } from "react-router-dom";
import Header from "../header-footer/header";
import Footer from "../header-footer/footer";
import "./paymentPage.css";
import { useParams } from "react-router-dom";
import UserHeader from "../header-footer/user_header";

export default function Pay() {
  const obj = useParams();
  if (!obj.user) {
    obj.user = "no-user";
  }
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const defaultToAccount = parseInt(queryParams.toAccountId, 10) || undefined;
  const defaultFromAccount =
    parseInt(queryParams.fromAccountId, 10) || undefined;
  const defaultMode = queryParams.mode || undefined;
  const defaultAmount = parseFloat(queryParams.amount) || undefined;

  return (
    <div className="payment-container">
      <div class="header">
        {obj.user === "no-user" && <Header />}
        {obj.user === "USER" && <UserHeader />}
      </div>
      <main className="payment-main">
        <PaymentPage
          defaultToAccount={defaultToAccount}
          defaultFromAccount={defaultFromAccount}
          defaultMode={defaultMode}
          defaultAmount={defaultAmount}
        />
      </main>
      <Footer />
    </div>
  );
}
