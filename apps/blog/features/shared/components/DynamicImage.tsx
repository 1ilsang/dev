import { FunctionComponent } from "react";

type DynamicImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: boolean;
  width?: number;
  height?: number;
};

const DynamicImage: FunctionComponent<DynamicImageProps> = ({
  width,
  height,
  className,
  src,
  alt,
  loading = true,
}) => {
  return (
    <div
      className={`${className} dynamic-image ${loading ? "loading" : ""}`}
      style={{ width, height }}
    >
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default DynamicImage;
