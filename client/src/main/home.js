import React from "react";
import Header from "../header-footer/header";
import Footer from "../header-footer/footer";
import TestimonialsSlider from "./slider";
import "./home.css";
import CardDisplay from "../user-panel/cards";

export default function Home() {
  return (
    <>
      <div class="header">
        <Header />
      </div>
      <div class="main">
        <div class="section-1">
          <div class="text">
            <h2>EASY BANKING</h2>
            <p>ವಿಶ್ವಾಸದ ಹೊಸ ಯುಗ, ಸುಲಭ ವ್ಯವಹಾರ, ವಿಶ್ವಾಸದ ಭಂಡಾರ</p>
          </div>
          <div class="image-container">
            <img
              src="https://img.freepik.com/free-vector/flat-woman-paying-by-pos-terminal-refund-cashback_88138-785.jpg?t=st=1726832923~exp=1726836523~hmac=33af9f974fd407c7901aaacb09572e157cc9e3e71aa6234c9c2ee3c6bb232d65&w=900"
              alt="Banking Image"
            />
          </div>
        </div>
        <img
          class="section-2"
          src="https://img.freepik.com/free-psd/e-wallet-banner-design-template_23-2149118601.jpg?t=st=1726853994~exp=1726857594~hmac=053dea2b6d592356a0838a1554f0ba16efbda936d505c22f9b385531076c5c14&w=1380"
        ></img>
        <div class="section-3">
          <img src="https://learn.g2.com/hs-fs/hubfs/Digital%20banking%20vs.%20traditional%20banking%20vs.%20online%20banking.png?width=600"></img>
          <img src="https://img.freepik.com/free-photo/3d-render-house-bills-payment-online-invoice_107791-16723.jpg?t=st=1726838695~exp=1726842295~hmac=bfbf8f185a72940b758925e8155e227a659728480861da5a4e66482e24f5f202&w=900"></img>
        </div>
        <TestimonialsSlider />
        <img
          class="ad"
          src="https://img.freepik.com/free-psd/e-wallet-banner-design-template_23-2149118599.jpg?t=st=1726853962~exp=1726857562~hmac=0d98990bd653035463fdde00fde84b23dc7cbb206947e534f07e28905c49678d&w=1380"
        ></img>
      </div>
      <Footer />
    </>
  );
}
