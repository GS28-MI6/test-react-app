import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";
import ReactLenis, { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MovieSlider from "./componenets/MovieSlider";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [activeTitleState, setActiveTitleState] = useState(0);
  const { contextSafe } = useGSAP();
  const appRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const activeSliderRef = useRef(null);
  const mainCtxRef = useRef(null);
  const subCtxRef = useRef(null);
  const revertCtxRef = useRef(null);
  const sliderAnimationRef = useRef(null);
  const isScrollingUserBased = useRef(true);
  const isActiveTitle = useRef(0);

  const defineState = (id) => {
    const currentActiveTitle = isActiveTitle.current;
    let state = "";
    switch (true) {
      case id === currentActiveTitle && id !== 0:
        state = "active";
        break;
      case id === 0 && currentActiveTitle === null:
        state = "first";
        break;
      case id < currentActiveTitle:
        state = "inactive";
        break;
      case id !== null && id === currentActiveTitle + 1:
        state = "right";
        break;
      case id !== null && id > currentActiveTitle + 1:
        state = "minify";
        break;
      case currentActiveTitle === null:
        state = "inactive";
        break;
      case id === 0:
        state = "first";
        break;
    }
    return state;
  };

  const defineWrapperWidth = (titlesArray, slidesArray) => {
    if (activeSliderRef.current) {
      if (titlesArray.length - 1 === activeSliderRef.current) {
        console.log("finalSlide");
        return slidesArray[activeSliderRef.current].offsetWidth;
      } else {
        return slidesArray[activeSliderRef.current].offsetWidth + 100;
      }
    } else {
      console.log(slidesArray);
      return slidesArray[0].offsetWidth + 100;
    }
  };

  const definePositionalWrapperWidth = (slide) => {
    console.log("finalSlide");
    return slide.offsetWidth + 100;
  };

  const setSlideToActive = (id) => {
    isActiveTitle.current = id;
    setActiveTitleState(id);
    reorderSlides();
  };

  const reorderSlides = contextSafe(() => {
    if (isActiveTitle.current === null) {
      return;
    }
    mainCtxRef.current.revert();
    subCtxRef.current.revert();
    subCtxRef.current = gsap.context(() => {
      const wrappers = gsap.utils.toArray(".sliderWrapper");
      for (let i = 0; i < wrappers.length; i++) {
        const state = defineState(i);
        if (state === "active") {
          gsap.fromTo(
            wrappers[i],
            {
              xPercent: 100,
            },
            { xPercent: 0, duration: 1, ease: "power1.inOut" }
          );
        }
      }
    });
    mainCtxRef.current = gsap.context(() => {
      const wrappers = gsap.utils.toArray(".positionalWrapper");
      for (let i = 0; i < wrappers.length; i++) {
        const state = defineState(i);
        if (state === "right") {
          gsap.set(wrappers[i], {
            xPercent: 100,
          });
        }
        if (state === "minify") {
          gsap.set(wrappers[i], {
            xPercent: 100,
          });
        }
      }
    });
    let triggers = ScrollTrigger.getAll();

    triggers.forEach((trigger) => {
      trigger.kill();
    });
    setTimeout(() => {
      subCtxRef.current.revert();
      defineScrollers();
    }, 1000);
  });

  const defineScrollers = contextSafe(() => {
    const wrappers = gsap.utils.toArray(".sliderWrapper");
    const selectedWrapper = wrappers[isActiveTitle.current];
    console.log(selectedWrapper);
    console.log("selectedWrapper", selectedWrapper);
    gsap.context(() => {
      gsap.to(".title", {
        xPercent: "auto",
        left: "auto",
        ease: "none",
        scrollTrigger: {
          trigger: selectedWrapper,
          horizontal: true,
          pinSpacing: false,
          pin: ".title",
          start: "left left",
          end: () =>
            "+=" + (definePositionalWrapperWidth(selectedWrapper) - 100),
          scrub: 1,
          markers: true,
        },
      });
    }, selectedWrapper);
    setTimeout(() => {
      let triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        trigger.refresh();
      });
    }, 3000);
  });

  const lenis = useLenis(
    ({ scroll, direction, actualScroll, dimensions }) => {
      if (!isScrollingUserBased.current) {
        return;
      }
      /*
      if (isActiveTitle.current === null && scroll > 0) {
        setShouldHideHeader(true);
        isActiveTitle.current = 0;
        setActiveTitleState(0);
      }
      if (
        scroll === 0 &&
        direction === -1 &&
        isScrollingUserBased.current &&
        isActiveTitle.current === 0
      ) {
        setShouldHideHeader(false);
        isActiveTitle.current = null;
        setActiveTitleState(null);
      }
      if (scroll === 0 && direction === -1 && isScrollingUserBased.current) {
        console.log("Scrolled back to the start of the page");
        if (isActiveTitle.current > 0) {
          isActiveTitle.current = isActiveTitle.current - 1;
          setActiveTitleState((prev) => prev - 1);
          console.log("setting active title to:", isActiveTitle.current);
        }
      } else */
      if (
        actualScroll + window.innerWidth === dimensions.scrollWidth &&
        direction === 1 &&
        isActiveTitle.current < 2
      ) {
        handleEndScroll();
      }
    },
    [activeSliderRef.current]
  );

  const animateScrollTease = contextSafe(() => {
    subCtxRef.current = gsap.context(() => {
      const wrappers = gsap.utils.toArray(".sliderWrapper");
      const selectedWrapper = wrappers[isActiveTitle.current + 1];
      console.log(selectedWrapper);
      gsap.to(selectedWrapper, {
        xPercent: -20,
        duration: 1,
        ease: "power1.inOut",
      });
    });
  });

  const returnFromScrollTease = contextSafe(() => {
    revertCtxRef.current = gsap.context(() => {
      const wrappers = gsap.utils.toArray(".sliderWrapper");
      const selectedWrapper = wrappers[isActiveTitle.current + 1];
      console.log(selectedWrapper);
      gsap.to(selectedWrapper, {
        xPercent: 0,
        duration: 0.2,
      });
    });
    setTimeout(() => {
      revertCtxRef.current.revert();
      subCtxRef.current.revert();
    }, 200);
  });

  const handleEndScroll = () => {
    animateScrollTease();
    isScrollingUserBased.current = false;
    const finalScroll = lenis.targetScroll;

    setTimeout(() => {
      if (lenis.targetScroll >= finalScroll) {
        isActiveTitle.current = isActiveTitle.current + 1;
        setActiveTitleState((prev) => prev + 1);
        isScrollingUserBased.current = true;
        reorderSlides();
        lenis.scrollTo(headerRef.current.clientWidth, {
          lock: true,
          duration: 2,
        });
      } else {
        isScrollingUserBased.current = true;
        returnFromScrollTease();
      }
    }, 1500);
  };

  useGSAP(() => {
    const titles = gsap.utils.toArray(".title");
    const slides = gsap.utils.toArray(".content");
    const wrappers = gsap.utils.toArray(".positionalWrapper");
    const wrapperWidth = defineWrapperWidth(titles, slides);
    console.log(wrapperWidth);
    gsap.set(".commonComponent", {
      width: wrapperWidth,
    });
    mainCtxRef.current = gsap.context(() => {
      for (let i = 0; i < titles.length; i++) {
        const state = defineState(i);

        if (state === "right") {
          gsap.set(wrappers[i], {
            xPercent: 100,
          });
        }
        if (state === "minify") {
          gsap.set(wrappers[i], {
            xPercent: 100,
          });
        }
      }
    });
    for (let i = 0; i < titles.length; i++) {
      console.log(wrappers[i]);
      gsap.set(wrappers[i], {
        width: definePositionalWrapperWidth(slides[i]),
      });
    }
    defineScrollers();
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
  }, []);

  const titleHover = (id, type) => {
    console.log(isActiveTitle.current);
    if (id === isActiveTitle.current || isActiveTitle.current === null) {
      return;
    }
    const wrappers = gsap.utils.toArray(".sliderWrapper");
    if (type === "entered") {
      gsap.to(wrappers[id + 1], {
        xPercent: 20,
        duration: 0.5,
        yoyo: true,
      });
    } else {
      gsap.to(wrappers[id + 1], {
        xPercent: 0,
        duration: 0.5,
        yoyo: true,
      });
    }
  };

  return (
    <ReactLenis
      root
      options={{
        orientation: "horizontal",
        gestureOrientataion: "both",
        smoothWheel: true,
      }}
    >
      <div className="app" ref={appRef}>
        <div className="header" ref={headerRef}>
          <div>
            <p>header</p>
          </div>
        </div>
        <div className="commonComponent" ref={sliderRef}>
          <MovieSlider
            state={defineState(0)}
            setSlideToActive={() => setSlideToActive(0)}
            titleHover={(type) => titleHover(0, type)}
            bgColor={"red"}
          />
          <MovieSlider
            state={defineState(1)}
            setSlideToActive={() => setSlideToActive(1)}
            titleHover={(type) => titleHover(1, type)}
            bgColor={"blue"}
          />
          <MovieSlider
            state={defineState(2)}
            setSlideToActive={() => setSlideToActive(2)}
            titleHover={(type) => titleHover(2, type)}
            bgColor={"green"}
          />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
