import React, { useEffect, useState } from "react";

export type Dimensions = {
  width: number;
  height: number;
};

export const useDimensions = (
  ref: React.RefObject<HTMLDivElement>
): Dimensions => {
  const getDimensions = (): Dimensions => ({
    width: ref.current?.offsetWidth || 0,
    height: ref.current?.offsetHeight || 0,
  });

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      handleResize();
    }

    // The resize event will probably never occur in real life, but there's not
    // reason to not support it.
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
};
