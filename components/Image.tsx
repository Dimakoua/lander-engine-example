import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export default function Image({ src, alt, width, height }: ImageProps) {
  return (
    <div className="flex justify-center my-8">
      <img src={src} alt={alt} width={width} height={height} className="rounded-lg shadow-md max-w-full h-auto" />
    </div>
  );
}
