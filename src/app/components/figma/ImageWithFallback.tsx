import React, { useState } from "react";
import Image from "next/image";

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, width, height, ...rest } = props;
  const w = typeof width === "number" ? width : undefined;
  const h = typeof height === "number" ? height : undefined;
  const shouldFill = !w || !h;

  return didError ? (
    <div
      className={`inline-block text-center align-middle bg-black/[0.02] dark:bg-white/[0.10] backdrop-blur-2xl ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Image src={ERROR_IMG_SRC} alt="Error loading image" width={88} height={88} className="opacity-70 dark:invert" />
      </div>
    </div>
  ) : (
    <Image
      src={typeof src === "string" && src.length > 0 ? src : ERROR_IMG_SRC}
      alt={alt ?? ""}
      className={className}
      style={style}
      onError={handleError}
      width={shouldFill ? undefined : w}
      height={shouldFill ? undefined : h}
      fill={shouldFill}
      sizes="100vw"
      {...rest}
    />
  );
}
