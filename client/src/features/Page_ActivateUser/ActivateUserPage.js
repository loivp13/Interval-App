import React, { useEffect, useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import { apiAxios } from "../../helpers/axios_api";
import { useParams } from "react-router-dom";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";

export default function ActivateUserPage() {
  let [text, setText] = useState("Activating Account");
  let { token } = useParams();
  useEffect((params) => {
    apiAxios
      .post("/auth/activate", { token })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setText("Your account has been activated.");
        } else {
        }
      })
      .catch((data) => {
        setText("Unable to register your email, please try signing up again.");
      });
  }, []);
  return (
    <MobileLayout>
      <main className="w-full">
        <Navbar displayBack={true}></Navbar>
        <div className="mt-6 text-3xl">{text}</div>
      </main>
      <Footer></Footer>
    </MobileLayout>
  );
}
