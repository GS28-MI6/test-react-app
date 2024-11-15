import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export const DelayLink = (props) => {
  const { delay, onDelayStart, onDelayEnd, replace, to, ...rest } = props;
  let timeout = null;
  let history = useNavigate();
  let location = useLocation();

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  const handleClick = (e) => {
    if (location?.pathname === to) return;

    onDelayStart(e, to);
    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();
    const lottieDiv = document.getElementById("lottie");
    gsap.set(lottieDiv, {
      display: "flex",
    });
    gsap.set("#rectLeft", {
      scale: 10,
      transformOrigin: "bottom right",
      fill: "black",
    });
    gsap.set("#rectRight", {
      scale: 10,
      transformOrigin: "bottom left",
      fill: "black",
    });
    gsap.set("#rectLeft2", {
      scale: 10,
      transformOrigin: "bottom right",
      fill: "black",
    });
    gsap.set("#rectRight2", {
      scale: 10,
      transformOrigin: "bottom left",
      fill: "black",
    });
    gsap.set("#rectLeft3", {
      scale: 10,
      transformOrigin: "bottom right",
      fill: "black",
    });
    gsap.set("#rectRight3", {
      scale: 10,
      transformOrigin: "bottom left",
      fill: "black",
    });
    let loader = gsap.timeline({});
    gsap.set("#logoNode", { opacity: 0, zIndex: 110000 });
    loader
      .to("#rectLeft", {
        transformOrigin: "bottom right",
        rotate: -90,
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        "#rectRight",
        {
          transformOrigin: "bottom left",
          rotate: 90,
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        "#rectLeft2",
        {
          transformOrigin: "bottom right",
          rotate: -90,
          duration: 1,
          ease: "power3.inOut",
        },
        "<+0.3"
      )
      .to(
        "#rectRight2",
        {
          transformOrigin: "bottom left",
          rotate: 90,
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        "#rectLeft3",
        {
          transformOrigin: "bottom right",
          rotate: -90,
          duration: 1,
          ease: "power3.inOut",
        },
        "<+0.3"
      )
      .to(
        "#rectRight3",
        {
          transformOrigin: "bottom left",
          rotate: 90,
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      )
      .to("#logoNode", {
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
    timeout = setTimeout(() => {
      loader
        .to("#logoNode", {
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        })
        .to("#rectLeft3", {
          transformOrigin: "bottom right",
          rotate: 0,
          duration: 1,
          ease: "power3.inOut",
        })
        .to(
          "#rectRight3",
          {
            transformOrigin: "bottom left",
            rotate: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          "#rectLeft2",
          {
            transformOrigin: "bottom right",
            rotate: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "<+0.3"
        )
        .to(
          "#rectRight2",
          {
            transformOrigin: "bottom left",
            rotate: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          "#rectLeft",
          {
            transformOrigin: "bottom right",
            rotate: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "<+0.3"
        )
        .to(
          "#rectRight",
          {
            transformOrigin: "bottom left",
            rotate: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(lottieDiv, { display: "none" });
      window.scrollTo(0, 0);
      history(to, { replace });
      onDelayEnd(e, to);
    }, delay);
  };

  return <Link {...rest} to={to} onClick={handleClick} />;
};

DelayLink.propTypes = {
  delay: PropTypes.number,
  onDelayStart: PropTypes.func,
  onDelayEnd: PropTypes.func,
  replace: PropTypes.bool,
  to: PropTypes.string,
};

DelayLink.defaultProps = {
  replace: false,
  delay: 1200,
  onDelayStart: () => {},
  onDelayEnd: () => {},
};

export default DelayLink;
