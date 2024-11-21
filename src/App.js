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
import giftCard1 from "./assets/Giftcard1.png";
import giftCard2 from "./assets/Giftcard2.png";
import giftCard3 from "./assets/Giftcard3.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* receives array of jsx elements I want to sort them by their id */

const giftCardArray = [
  giftCard1,
  giftCard2,
  giftCard3,
  giftCard1,
  giftCard2,
  giftCard3,
];

const orderArrayById = (arr) => {
  return arr.sort((a, b) => {
    const aId = Number(a.id.replace("hexGroup", "")); // remove #hexGroup and leave number
    const bId = Number(b.id.replace("hexGroup", ""));
    console.log(aId, bId);
    if (aId < bId) {
      return -1;
    }
    if (aId > bId) {
      return 1;
    }
    return 0;
  });
};

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
