import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";
import ReactLenis, { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MovieSlider from "./componenets/MovieSlider";
import { useGSAP } from "@gsap/react";
import { verticalLoop } from "./helpers/vertical-loop";
import { Observer } from "gsap/Observer";
import Ronin from "./assets/47Ronin.jpg";
import GuardianesDeLaGalaxia from "./assets/guardianesDeLaGalaxia.jpg";
import ReadyPlayerOne from "./assets/readyPlayerOne.webp";
import TheProdigy from "./assets/theProdigy.jpg";
import { horizontalLoop } from "./helpers/horizontal-loop";

gsap.registerPlugin(ScrollTrigger, useGSAP, Observer);

function App() {
  const { contextSafe } = useGSAP();

  useGSAP(() => {
    const loop = horizontalLoop(".imagen", {
      repeat: -1,
    });
    let slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });
    // make the loop stopped initially.
    loop.timeScale(0);

    // now use an Observer to listen to pointer/touch/wheel events and set the timeScale of the infinite looping timeline accordingly.
    Observer.create({
      target: ".header",
      type: "pointer,touch,wheel",
      wheelSpeed: -0.1,
      onChange: (self) => {
        loop.timeScale(
          Math.abs(self.deltaX) > Math.abs(self.deltaY)
            ? -self.deltaX
            : -self.deltaY
        ); // whichever direction is bigger
        slow.invalidate().restart(); // now decelerate
      },
    });
  });

  return (
    <ReactLenis
      root
      options={{
        orientation: "horizontal",
        gestureOrientataion: "both",
        smoothWheel: true,
      }}
    >
      <div className="app">
        <div className="header">
          <img src={Ronin} alt="ronin" className="imagen imagen1" />
          <img src={GuardianesDeLaGalaxia} alt="ronin" className="imagen imagen2" />
          <img src={ReadyPlayerOne} alt="ronin" className="imagen imagen3" />
          <img src={TheProdigy} alt="ronin" className="imagen imagen4" />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
