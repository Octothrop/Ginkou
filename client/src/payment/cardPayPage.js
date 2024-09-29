import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Header from "../header-footer/header";
import Footer from "../header-footer/footer";
import CardPage from "./cardPayment";
import UserHeader from "../header-footer/user_header";
import "./paymentPage.css";
import { useParams } from "react-router-dom";

export default function CardPay() {
  const obj = useParams();
  if (!obj.user) {
    obj.user = "no-user";
  }
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const defaultToAccount = parseInt(queryParams.toAccountId, 10) || undefined;
  const defaultMode = queryParams.mode || undefined;
  const defaultAmount = parseFloat(queryParams.amount) || undefined;

  return (
    <div className="payment-container">
      <div class="header">
        {obj.user === "no-user" && <Header />}
        {obj.user === "USER" && <UserHeader />}
      </div>
      <main className="payment-main">
        <CardPage
          defaultToAccount={defaultToAccount}
          defaultMode={defaultMode}
          defaultAmount={defaultAmount}
        />
      </main>
      <Footer />
    </div>
  );
}
