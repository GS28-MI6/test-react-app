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
import SamplePDF from "./componenets/SamplePDF/SamplePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

gsap.registerPlugin(ScrollTrigger, useGSAP, Observer);

function App() {
  return (
    <ReactLenis
      root
      options={{
        orientation: "horizontal",
        gestureOrientataion: "both",
        smoothWheel: true,
      }}
    >
      <PDFDownloadLink document={<SamplePDF />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <PDFViewer width={500} height={500}>
        <SamplePDF />
      </PDFViewer>
    </ReactLenis>
  );
}

export default App;
