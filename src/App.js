import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useScroll } from "framer-motion";
import { ScrollObserver, valueAtPercentage } from "aatjs";
import cx from "classnames";

function App() {
  const [isActiveContent, setIsActiveContent] = useState(0);
  const [isActiveTitle, setIsActiveTitle] = useState(null);
  const [isScrollUserBased, setIsScrollUserBased] = useState(true);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const appRef = useRef(null);
  const isScrollingDisabled = useRef(false);
  const isScrollingFunctionBased = useRef(false);

  const headerClassname = cx("header", {
    minify: shouldHideHeader,
  });
  const title1Classname = cx("title", {
    activeHeader: isActiveTitle === 0,
    right: isActiveTitle < 0,
    minify: isActiveTitle > 0,
  });
  const title2Classname = cx("title", {
    activeHeader: isActiveTitle === 1,
    minify: isActiveTitle > 1,
    right: isActiveTitle < 1,
  });
  const title3Classname = cx("title", {
    activeHeader: isActiveTitle === 2,
    minify: isActiveTitle > 2,
    right: isActiveTitle < 2,
  });
  useEffect(() => {
    const app = appRef.current;
    const handleScroll = (event) => {
      console.log("event", event, "app", app);
      if (isScrollingFunctionBased.current) {
        return;
      }

      if (isActiveTitle === null && app.scrollLeft > 0) {
        setShouldHideHeader(true);
        setIsActiveTitle(0);
      }
      if (app.scrollLeft === 0) {
        console.log("Scrolled back to the start of the page");
        if (isActiveContent > 0) {
          setIsActiveContent(isActiveContent - 1);
          setIsActiveTitle(isActiveTitle - 1);
          disableScrollingForDuration();
        }
      } else if (app.scrollLeft + app.clientWidth === app.scrollWidth) {
        console.log("Finished scrolling the page horizontally");
        console.log(isActiveContent);
        setIsScrollUserBased(false);
        setIsActiveContent(isActiveContent + 1);
        setIsActiveTitle(isActiveTitle + 1);
        disableScrollingForDuration();
        setTimeout(() => {
          app.scrollTo({
            left: 1,
            top: window.scrollY,
            behavior: "smooth",
          });
        }, 550);
      }
    };
    const disableScrollingForDuration = () => {
      isScrollingDisabled.current = true;
      isScrollingFunctionBased.current = true;
      setTimeout(() => {
        isScrollingDisabled.current = false;
        isScrollingFunctionBased.current = false;
      }, 700);
    };
    const handleResize = () => {
      console.log("App resized");
    };
    app.addEventListener("wheel", handleScroll, { passive: false });
    app.addEventListener("touchstart", handleScroll, { passive: false });
    app.addEventListener("touchmove", handleScroll, { passive: false });
    app.addEventListener("resize", handleResize);
    return () => {
      app.removeEventListener("wheel", handleScroll);
      app.removeEventListener("touchstart", handleScroll);
      app.removeEventListener("touchmove", handleScroll);
      app.removeEventListener("resize", handleResize);
    };
  }, [isActiveContent, isActiveTitle, isScrollUserBased]);

  useEffect(() => {
    const handleScroll = (event) => {
      const app = appRef.current;
      if (isScrollingDisabled.current) {
        event.preventDefault();
        return;
      }
      const delta = Math.max(
        -1,
        Math.min(1, event.wheelDelta || -event.detail)
      );
      app.scrollLeft -= delta * 40;
    };

    const handleResize = () => {
      console.log("App resized");
    };

    const app = appRef.current;
    app.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      app.removeEventListener("wheel", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      <div className={headerClassname}>
        <div>
          <p>header</p>
        </div>
      </div>
      <div className="commonComponent">
        <div className={title1Classname} style={{ backgroundColor: "red" }}>
          <div />
        </div>
        <div
          className={
            isActiveContent === 0 ? "content active" : "content minify"
          }
        >
          <div style={{ backgroundColor: "aquamarine" }} />
        </div>
        <div
          className={title2Classname}
          style={{ "--title-id": 1, backgroundColor: "blue" }}
        >
          <div />
        </div>
        <div
          className={
            isActiveContent === 1 ? "content active" : "content minify"
          }
        >
          <div style={{ backgroundColor: "yellow" }} />
        </div>
        <div
          className={title3Classname}
          style={{ "--title-id": 0, backgroundColor: "green" }}
        >
          <div />
        </div>
        <div
          className={
            isActiveContent === 2 ? "content active" : "content minify"
          }
        >
          <div style={{ backgroundColor: "cyan" }} />
        </div>
      </div>
    </div>
  );
}

export default App;
