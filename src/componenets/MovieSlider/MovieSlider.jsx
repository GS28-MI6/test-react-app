import React, { useRef, useLayoutEffect, useEffect } from "react";
import Ronin from "../../assets/47Ronin.jpg";
import GuardianesDeLaGalaxia from "../../assets/guardianesDeLaGalaxia.jpg";
import ReadyPlayerOne from "../../assets/readyPlayerOne.webp";
import TheProdigy from "../../assets/theProdigy.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./index.css";
import cx from "classnames";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const MovieSlider = ({
  state,
  bgColor,
  titleHover,
  setSlideToActive,
}) => {
  const slider = useRef(null);
  const container = useRef(null);
  const titleRef = useRef(null);
  const scrollTween = useRef(null);
  const animationRef = useRef(null);
  const currentAnimationTarger = useRef(null);

  /*useGSAP(() => {
    console.log("First I am " + bgColor + " title", state);
    if (state !== "active" && state !== "first") {
      return;
    }
    console.log("I am " + bgColor + " title");
    scrollTween.current = gsap.to(titleRef.current, {
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        horizontal: true,
        pinSpacing: false,
        scrub: 1,
        pin: titleRef.current,
        start: "left left",
        end: "right+=1000",
        markers: true,
      },
    });
    return () => scrollTween?.current.kill();
  }, [state]);*/

  const onhoverImage = (e) => {
    if (currentAnimationTarger.current !== e.target) {
      currentAnimationTarger.current = e.target;
      animationRef.current = gsap.fromTo(
        e.target,
        {
          backgroundPosition: "25% center",
        },
        {
          yoyo: true,
          repeat: -1,
          duration: 10,
          backgroundPosition: "100% center",
          ease: "none",
          paused: true,
          markers: true,
        }
      );
    }
    animationRef.current.play();
  };

  const onMouseLeaveAnimation = () => {
    animationRef.current.pause();
  };

  return (
    <div className={`positionalWrapper ${state}`}>
      <div className={`sliderWrapper`} ref={container}>
        <div
          className="title"
          ref={titleRef}
          style={{ backgroundColor: `${bgColor}` }}
          onClick={() => setSlideToActive()}
        >
          <p>title</p>
        </div>
        <div className="content" ref={slider}>
          <div
            className="imgWrapper"
            onMouseEnter={(e) => onhoverImage(e)}
            onMouseLeave={() => onMouseLeaveAnimation()}
          >
            <div className="img" style={{ backgroundImage: `url(${Ronin})` }} />
          </div>

          <div
            className="imgWrapper"
            onMouseEnter={(e) => onhoverImage(e)}
            onMouseLeave={() => onMouseLeaveAnimation()}
          >
            <div
              className="img"
              style={{ backgroundImage: `url(${GuardianesDeLaGalaxia})` }}
            />
          </div>
          <div
            className="imgWrapper"
            onMouseEnter={(e) => onhoverImage(e)}
            onMouseLeave={() => onMouseLeaveAnimation()}
          >
            <div
              className="img"
              style={{ backgroundImage: `url(${ReadyPlayerOne})` }}
            />
          </div>
          <div
            className="imgWrapper"
            onMouseEnter={(e) => onhoverImage(e)}
            onMouseLeave={() => onMouseLeaveAnimation()}
          >
            <div
              className="img"
              style={{ backgroundImage: `url(${TheProdigy})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
