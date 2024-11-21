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
import { Flip } from "gsap/Flip";
import gsap from "gsap";
import { horizontalLoop } from "../helpers/horizontal-loop";
import { horizontalLoopAlter } from "../helpers/horizontal-loop-alter";
import televisor from "../assets/tvwebsite2.png";

gsap.registerPlugin(ScrollTrigger, useGSAP, Flip);

/* receives array of jsx elements I want to sort them by their id */

const giftCardArray = [
  { image: giftCard1, id: "giftCard1" },
  { image: giftCard2, id: "giftCard2" },
  { image: giftCard3, id: "giftCard3" },
];

export const Home = () => {
  const imageContainerRef = useRef(null);
  const activeElement = useRef(null);
  const loopRef = useRef();
  const currentImageIndex = useRef(3);
  const [giftCards, setGiftCards] = useState({
    giftCardArray: giftCardArray,
    state: null,
  });

  useEffect(() => {
    gsap.set(".active", {
      scale: 1.2,
      scrollTrigger: {
        trigger: ".active",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        toggleClass: { targets: ".active", className: "active" },
      },
    });
  }, []);

  useGSAP(() => {
    if (!giftCards.state) return;
    console.log("oldState", giftCards.state);
    Flip.from(giftCards.state, {
      absolute: true,
      scale: true,
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: () => {
        console.log("done");
        const newState = Flip.getState(".gift-card");
        console.log("newState", newState);
      },
    });
  }, [giftCards]);

  const moveImage = (idx, flipId) => {
    if (idx === 1) {
      return;
    }
    let state = Flip.getState(".gift-card");
    const currentImage = document.querySelectorAll(".gift-card")[idx];
    currentImage.classList.add("selected");
    const auxArray = giftCards.giftCardArray;
    if (idx === 2) {
      const firstGiftCard = auxArray.shift();
      auxArray.push(firstGiftCard);
    } else {
      const lastGiftCard = auxArray.pop();
      auxArray.unshift(lastGiftCard);
    }
    setGiftCards({
      giftCardArray: auxArray,
      state,
    });
  };

  const generateZIndex = (id) => {
    switch (id) {
      case 0:
        return 2;
      case 1:
        return 3;
      case 2:
        return 1;
    }
  };

  return (
    <>
      <div
        className="body"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          ref={imageContainerRef}
          className="image-container"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            position: "relative",
            justifyContent: "space-evenly",
            height: "90%",
          }}
        >
          {giftCardArray.map((giftCard, idx) => (
            <img
              src={giftCard.image}
              className={idx === 1 ? "gift-card active" : "gift-card"}
              data-flip-id={giftCard.id}
              alt=""
              onClick={() => moveImage(idx, giftCard.id)}
              style={{
                display: "flex",
                height: "70%",
                width: "auto",
                margin: 0,
                padding: 0,
                position: "relative",
                flexShrink: 0,
                fontSize: "21px",
                cursor: "pointer",
                marginRight: 80,
                zIndex: generateZIndex(idx),
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
