import type { FC } from "react";
import { MutableRefObject } from "react";
import { toPng } from "html-to-image";
import Button from "react-bootstrap/Button";

export interface DownloadImageProps {
  elementRef: MutableRefObject<HTMLElement>;
}

export const DownloadImage: FC<DownloadImageProps> = (props) => {
  const htmlToImageConvert = () => {
    toPng(props.elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "frothers-squad.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button variant="secondary" onClick={htmlToImageConvert}>
      🖼️
    </Button>
  );
};
export default DownloadImage;
