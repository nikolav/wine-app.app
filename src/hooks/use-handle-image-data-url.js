import {
  useGlobals,
  ARTICLE_IMAGE_FILE,
  ARTICLE_IMAGE_DATAURL,
  ARTICLE_IMAGE_SHOW,
} from "./use-globals";
////
////
export default function useHandleImageDataUrl(
  __ = {
    GLOBAL_FILE: ARTICLE_IMAGE_FILE,
    GLOBAL_DATAURL: ARTICLE_IMAGE_DATAURL,
    GLOBAL_SHOW: ARTICLE_IMAGE_SHOW,
  }
) {
  const globals = useGlobals();
  const imageData = globals(__.GLOBAL_DATAURL);
  const imageNode = globals(__.GLOBAL_FILE);
  const deleteImage = () => {
    if (imageNode?.target) imageNode.target.value = "";
    globals.set(__.GLOBAL_DATAURL, null);
    globals.set(__.GLOBAL_FILE, null);
    globals.set(__.GLOBAL_SHOW, null);
  };
  const showImage = () => {
    // set it to new value `Date.now()`
    // `useEffect` will pick up change and show image
    globals.set(__.GLOBAL_SHOW, Date.now());
  };
  //
  const image_ = () => imageData;
  image_.rm = deleteImage;
  image_.show = showImage;
  //
  return image_;
}
