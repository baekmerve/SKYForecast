/* eslint-disable no-unused-vars */
import React from "react";
import { Skeleton } from "./ui/skeleton";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <DotLottieReact
        src="https://lottie.host/e5c8054e-3943-4ac8-bacc-bdb36f1484c1/tIJrnFSVwF.lottie"
        loop
        autoplay
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default LoadingSkeleton;
