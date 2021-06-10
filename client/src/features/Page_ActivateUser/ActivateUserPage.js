import React, { useEffect, useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import { apiAxios } from "../../helpers/axios_api";
import { useParams } from "react-router-dom";

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
        setText(data.response.data.error);
      });
  }, []);
  return <MobileLayout>{text}</MobileLayout>;
}
