import React, { useEffect, useRef, useState } from "react";
import DelayLink from "../helpers/DelayLink";
import BGImg from "../assets/bgimg.jfif";
import { ReactComponent as Arrow } from "../assets/Arrow.svg";
import DelayLink2 from "../helpers/DelayLink2";
import giftCard1 from "../assets/Giftcard1.png";
import giftCard2 from "../assets/Giftcard2.png";
import giftCard3 from "../assets/Giftcard3.png";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { horizontalLoop } from "../helpers/horizontal-loop";
import { horizontalLoopAlter } from "../helpers/horizontal-loop-alter";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* receives array of jsx elements I want to sort them by their id */

const giftCardArray = [
  giftCard1,
  giftCard2,
  giftCard3,
  giftCard1,
  giftCard2,
  giftCard3,
  giftCard1,
];

export const Home = () => {
  const imageContainerRef = useRef(null);
  const activeElement = useRef(null);
  const loopRef = useRef();
  const currentImageIndex = useRef(3);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(3);

  useGSAP(() => {
    gsap.context(() => {
      const images = gsap.utils.toArray(".gift-card");
      console.log(currentImageIndex2);
      loopRef.current = horizontalLoopAlter(images, {
        paused: true,
        center: true,
        paddingRight: 80,
        onChange: (element, index) => {
          // when the active element changes, this function gets called.
          activeElement.current &&
            activeElement.current.classList.remove("active");
          element.classList.add("active");
          activeElement.current = element;
          gsap
            .timeline({})
            .to(".gift-card", { scale: 0.7, opacity: 0.5, duration: 0.5 })
            .to(".active", { scale: 1, opacity: 1, duration: 0.5 }, "<");
        },
      });
    }, imageContainerRef.current);
  });

  const moveImage = (idx) => {
    currentImageIndex.current = idx;
    setCurrentImageIndex2(idx);
    console.log(currentImageIndex2);
    loopRef.current.toIndex(idx, {
      duration: 0.5,
      ease: "power3",
    });
  };

  return (
    <>
      <div
        className="body"
        style={{
          height: "150vh",
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: "5rem", color: "black" }}>Bienvenidos</p>
        <div
          ref={imageContainerRef}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "75vw",
            overflow: "hidden",
            alignItems: "center",
            position: "relative",
          }}
        >
          {giftCardArray.map((giftCard, idx) => (
            <img
              src={giftCard}
              className={"gift-card"}
              alt=""
              onClick={() => moveImage(idx)}
              style={{
                display: "flex",
                height: "100%",
                width: "500px",
                margin: 0,
                padding: 0,
                position: "relative",
                flexShrink: 0,
                fontSize: "21px",
                cursor: "pointer",
                marginRight: 80,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
