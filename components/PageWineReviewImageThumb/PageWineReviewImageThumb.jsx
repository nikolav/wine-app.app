import Image from "next/image";
import useHandleImageDataUrl from "../../src/hooks/use-handle-image-data-url";
import {
  WINE_REVIEW_IMAGE_DATAURL,
  WINE_REVIEW_IMAGE_FILE,
  WINE_REVIEW_IMAGE_SHOW,
} from "../../src/hooks/use-globals";
import { prevent } from "../../src/util";
//
export default function PageWineReviewImageThumb({
  imageDataUrl,
  classes = "",
}) {
  // const image_ = useHandleImageDataUrl();
  //
  const image_ = useHandleImageDataUrl({
    GLOBAL_FILE: WINE_REVIEW_IMAGE_FILE,
    GLOBAL_DATAURL: WINE_REVIEW_IMAGE_DATAURL,
    GLOBAL_SHOW: WINE_REVIEW_IMAGE_SHOW,
  });

  return (
    <Image
      onClick={prevent(image_.show)}
      className={`!object-cover !object-center ${classes}`}
      layout="fill"
      src={imageDataUrl}
      alt=""
    />
  );
}
