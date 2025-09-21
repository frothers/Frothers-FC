import type { FC } from "react";
import { MutableRefObject } from "react";
import { toPng } from "@jpinsonneau/html-to-image"
import Button from "react-bootstrap/Button";
import download from "downloadjs";

export interface DownloadImageProps {
  elementRef: MutableRefObject<HTMLElement>;
}

export const DownloadImage: FC<DownloadImageProps> = (props) => {
  const htmlToImageConvert = () => {
   toPng(props.elementRef.current)
  .then((dataUrl) => download(dataUrl, 'frothers-squad.png'))

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
