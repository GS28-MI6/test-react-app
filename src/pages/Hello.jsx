import React from "react";
import DelayLink from "../helpers/DelayLink";
import BGImg from "../assets/bgimg2.jfif";
import { ReactComponent as Arrow } from "../assets/Arrow.svg";
import DelayLink2 from "../helpers/DelayLink2";

export const Hello = () => {
  return (
    <div
      className="body"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BGImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "5rem", color: "white" }}>A mi web</p>
      <DelayLink2 delay={3000} to="/">
        <Arrow
          style={{
            width: "100px",
            height: "100px",
            color: "white",
            transform: "rotate(180deg)",
          }}
        />
      </DelayLink2>
    </div>
  );
};
