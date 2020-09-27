import React, { useState, useContext, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        options={defaultOptions}
        height={window.innerWidth > 600 ? 400 : 200}
        width={window.innerWidth > 600 ? 400 : 200}
      />
    </div>
  );
};

export default Loading;
