import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const DelayLink2 = (props) => {
  const { delay, onDelayStart, onDelayEnd, replace, to, ...rest } = props;
  const animationRef = useRef(null);
  let timeout = null;
  let history = useNavigate();
  let location = useLocation();
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
    const hexagonsContainer = document.getElementById("hexagonsContainer");
    gsap.set(hexagonsContainer, { display: "flex", zIndex: 10 });
    const hehagonGroups = orderArrayById(gsap.utils.toArray("#hexagons g"));
    animationRef.current = gsap.timeline({ paused: true });
    hehagonGroups.forEach((group) => {
      console.log(group.id);
      gsap.set("#" + group.id + " path", {
        display: "flex",
        translateY: 0,
        translateX: 0,
      });
      animationRef.current.fromTo(
        "#" + group.id + " path",
        {
          scale: 0.001,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.0025,
          transformOrigin: "center center",
        },
        ">-0.4"
      );
    });
    animationRef.current.play(0);
    timeout = setTimeout(() => {
      animationRef.current.reverse();
      animationRef.current.eventCallback("onReverseComplete", () => {
        gsap.set(hexagonsContainer, { display: "none", zIndex: -1 });
      });
      window.scrollTo(0, 0);
      history(to, { replace });
      onDelayEnd(e, to);
    }, delay);
  };

  return <Link {...rest} to={to} onClick={handleClick} />;
};

DelayLink2.propTypes = {
  delay: PropTypes.number,
  onDelayStart: PropTypes.func,
  onDelayEnd: PropTypes.func,
  replace: PropTypes.bool,
  to: PropTypes.string,
};

DelayLink2.defaultProps = {
  replace: false,
  delay: 1200,
  onDelayStart: () => {},
  onDelayEnd: () => {},
};

export default DelayLink2;
