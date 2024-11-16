import React, { useState } from "react";
import "./App.css";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import BGImg from "./assets/bgimg.jfif";
import logoNode from "./assets/logoNode.png";
import { ReactComponent as Arrow } from "./assets/Arrow.svg";
import { ReactComponent as Curtain } from "./assets/curtain.svg";
import { ReactComponent as Curtain2 } from "./assets/curtain2.svg";
import { ReactComponent as Curtain3 } from "./assets/curtain3.svg";
import { ReactComponent as Hexagons } from "./assets/hexagonsTest3.svg";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Hello } from "./pages/Hello";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* receives array of jsx elements I want to sort them by their id */

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
      </Routes>
    </div>
  );
}

export default App;
