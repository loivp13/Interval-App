import React from "react";
import Signin from "./components/Signin";

export default function LandingPage({ setTheme, theme }) {
  return (
    <div className={"bg-th-background"}>
      <Signin></Signin>
    </div>
  );
}
