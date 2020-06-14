import React from "react";
import { useLoadingPage } from "../../hooks/useLoadingPage";

const LoadingPage = () => {
  const { isShow } = useLoadingPage();
  return isShow ? (
    <div
      className="loading-container"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="loading-inner">
        <div className="loader"></div>
      </div>
    </div>
  ) : null;
};

export default LoadingPage;
