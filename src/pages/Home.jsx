import React, { useEffect, useRef, useState } from "react";
import DelayLink from "../helpers/DelayLink";
import BGImg from "../assets/bgimg.jfif";
import { ReactComponent as Arrow } from "../assets/Arrow.svg";
import DelayLink2 from "../helpers/DelayLink2";
import giftCard1 from "../assets/Giftcard1.png";
import giftCard2 from "../assets/Giftcard2.png";
import giftCard3 from "../assets/Giftcard3.png";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { horizontalLoop } from "../helpers/horizontal-loop";
import { horizontalLoopAlter } from "../helpers/horizontal-loop-alter";
import image1 from "../assets/Flip/butterfly1.jpeg";
import image2 from "../assets/Flip/parrot1.jpg";
import image3 from "../assets/Flip/heron.jpeg";
import image4 from "../assets/Flip/butterfly2.jpg";
import image5 from "../assets/Flip/eagel1.jpg";
import image6 from "../assets/Flip/parrot2.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP, Flip);

/* receives array of jsx elements I want to sort them by their id */

const imageArray = [image1, image2, image3, image4, image5];

export const Home = () => {
  const imageContainerRef = useRef(null);

  const swapImages = (id) => {
    if (id === 0) return;
    const imagesGrid = gsap.utils.toArray(".image-carousel");
    let divWithImage = document.createElement("div");
    divWithImage.className = "image-new";
    divWithImage.style.cssText = `background-image: url(${imageArray[id]});`;

    let fistDivWithImage = document.createElement("div");
    fistDivWithImage.className = "image-new";
    fistDivWithImage.style.cssText = `background-image: url(${imageArray[0]});`;

    imagesGrid[0].prepend(divWithImage);
    imagesGrid[id].prepend(fistDivWithImage);
    gsap
      .timeline({
        onComplete: () => {
          console.log("list");
          const currentImage = imagesGrid[id].querySelector(".image");
          const fistImage = imagesGrid[0].querySelector(".image");
          gsap.set(currentImage, {
            backgroundImage: `url(${imageArray[0]})`,
            opacity: 1,
          });
          gsap.set(fistImage, {
            backgroundImage: `url(${imageArray[id]})`,
            opacity: 1,
          });
          imagesGrid[0].removeChild(divWithImage);
          imagesGrid[id].removeChild(fistDivWithImage);
          [imageArray[0], imageArray[id]] = [imageArray[id], imageArray[0]];
        },
      })
      .to(imagesGrid[0].querySelector(".image"), {
        opacity: 0,
        duration: 1.5,
      })
      .to(
        imagesGrid[id].querySelector(".image"),
        {
          opacity: 0,
          duration: 1.5,
        },
        "<"
      );
      
  };

  return (
    <>
      <div
        className="body"
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div ref={imageContainerRef} className="image-carousel-container">
          {imageArray.map((image, idx) => (
            <div className="image-carousel">
              <div
                key={idx}
                className="image"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 10,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
              <div
                className="overlay"
                onClick={() => swapImages(idx)}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  backgroundColor: "rgb(255 255 255 / 0%)",
                  zIndex: 11,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
