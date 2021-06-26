import React from "react";
import Navbar from "../globalComponents/navbar/Navbar";
import EditIcon from "../../images//ICON - pencil@3x.png";
import DeleteIcon from "../../images//BUTTON - cancel@3x.png";
import RearrangeIcon from "../../images//ICON - rearrange@3x.png";
import HeartIcon from "../../images//BUTTON - desktop ver. WHITE heart@3x.png";
import SettingIcon from "../../images//BUTTON - settings@3x.png";
import Footer from "../footer/Footer";

const HelpPage = () => {
  return (
    <div className="HelpPage h-full min-h-screen md:h-screen flex bg-th-primary flex-col items-center  p-5 pb-0 font-openSans">
      <Navbar displayBack={true}></Navbar>
      <header>
        <h1 className="text-3xl text-th-secondary tracking-widest m-7">
          helpful tips
        </h1>
      </header>
      <main className=" self-center max-w-md">
        <section className="HelpPage_Setting mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Setting a timer
          </h2>
          <p className="text-th-secondary text-20px pl-8">
            Interval timers contain a set of two timers that repeat a number of
            times. The <b>set</b> number is how many times you want to repeat
            the work + break timers.
          </p>
        </section>
        <section className="HelpPage_Editing  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Editing a timer
          </h2>
          <p className="text-th-secondary text-20px pl-8">
            Within an interval timer, you can edit individual times and timer
            names. You can also delete specific timers.
          </p>
        </section>
        <section className="HelpPage_Icons  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Icons
          </h2>
          <ul className="pl-8">
            <li>
              <div className="flex items-center">
                <div className="w-4 mr-4">
                  <img className="w-full h-auto" src={EditIcon} alt="" />
                </div>
                <p className="text-th-secondary text-20px">edit</p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className="w-4 mr-4">
                  <img className="w-full h-auto" src={DeleteIcon} alt="" />
                </div>
                <p className="text-th-secondary text-20px">delete</p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className="w-4 mr-4">
                  <img className="w-full h-auto" src={RearrangeIcon} alt="" />
                </div>
                <p className="text-th-secondary text-20px">
                  rearrange(hold and drag)
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className="w-4 mr-4">
                  <img className="w-full h-auto" src={HeartIcon} alt="" />
                </div>
                <p className="text-th-secondary text-20px">your saved timers</p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className="w-4 mr-4">
                  <img className="w-full h-auto" src={SettingIcon} alt="" />
                </div>
                <p className="text-th-secondary text-20px">settings</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="HelpPage_Questions  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Questions or Problems?
          </h2>
          <p className="text-th-secondary text-20px pl-8">
            email: interval_timer@gmail.com
          </p>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HelpPage;
