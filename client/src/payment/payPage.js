import React from "react";
import queryString from "query-string";
import PaymentPage from "./payment";
import { useLocation } from "react-router-dom";
import Footer from "../header-footer/footer";
import "./paymentPage.css";
import { useParams } from "react-router-dom";
import UserHeader from "../header-footer/user_header";
import AdminHeader from "../header-footer/admin-header";
import Header from "../header-footer/header";

export default function Pay() {
  const obj = useParams();
  if (!obj.user) {
    obj.user = "no-user";
  }
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const { userId } = useParams();

  const defaultToAccount = parseInt(queryParams.toAccountId, 10) || undefined;
  const defaultFromAccount =
    parseInt(queryParams.fromAccountId, 10) || undefined;
  const defaultMode = queryParams.mode || undefined;
  const defaultAmount = parseFloat(queryParams.amount) || undefined;
  const url = queryParams.url || undefined;

  const hasDefaultParams =
    defaultToAccount !== undefined &&
    defaultFromAccount !== undefined &&
    defaultMode !== undefined &&
    defaultAmount !== undefined&&
    url !== undefined;

  return (
    <div className="payment-container">
      <div class="header">
        {!hasDefaultParams && obj.user === "ADMIN" && <AdminHeader />}
        {!hasDefaultParams && obj.user === "USER" && <UserHeader />}
        {hasDefaultParams && <Header />}
      </div>
      <main className="payment-main">
        <PaymentPage
          defaultToAccount={defaultToAccount}
          defaultFromAccount={defaultFromAccount}
          defaultMode={defaultMode}
          defaultAmount={defaultAmount}
          UrlUserId={userId}
          url = {url}
        />
      </main>
      <Footer />
    </div>
  );
}
