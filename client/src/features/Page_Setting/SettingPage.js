import React from "react";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import ColorPalette from "./components/ColorPalette";
import SlideSwitch from "./components/SlideSwitch";

const SettingPage = () => {
  return (
    <div className="SettingPage h-full min-h-screen md:h-screen bg-th-primary pb-0 flex flex-col items-center font-openSans">
      <Navbar displayBack={true}></Navbar>
      <header>
        <h1 className="text-3xl text-th-secondary tracking-widest m-7">
          settings
        </h1>
      </header>
      <main className="self-center w-screen max-w-md px-8 ">
        <section className="SettingPage_Color mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            colors
          </h2>
          <div className="flex flex-row ">
            <ColorPalette color="#5A91AA"></ColorPalette>
            <ColorPalette color="#A6C4C7"></ColorPalette>
            <ColorPalette color="#C8B2C8"></ColorPalette>
          </div>
        </section>
        <section className="SettingPage_Notifications  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Notifications
          </h2>
          <SlideSwitch></SlideSwitch>
        </section>

        <section className="SettingPage_Account  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Account
          </h2>
          <p className="text-th-white text-lg ml-4 font-quicksand">
            Change password
          </p>
          <p className="text-th-white text-lg ml-4 font-quicksand">
            Delete account
          </p>
        </section>
        <section className="SettingPage_About  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            About
          </h2>
          <p className="text-th-secondary text-lg ml-4">&copy; 2021</p>
          <p className="text-th-secondary text-lg ml-4">
            Designed by Lynna Huynh
          </p>
          <p className="text-th-secondary text-lg ml-4">
            Developed by Loi Pham
          </p>
          <br />

          <p className="text-th-secondary text-lg ml-4"> updated: 6.4.21</p>
          <p className="text-th-secondary text-lg ml-4">V1.0</p>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default SettingPage;
