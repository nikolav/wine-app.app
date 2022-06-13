import React, { useEffect } from "react";
import useIsMounted from "../../src/hooks/use-is-mounted";
import useFileReader from "../../src/hooks/use-file-reader";
import {
  useGlobals,
  ARTICLE_IMAGE_DATAURL,
  ARTICLE_IMAGE_FILE,
  // WINE_REVIEW_IMAGE_FILE,
  // WINE_REVIEW_IMAGE_DATAURL,
} from "../../src/hooks/use-globals";
import { useFlags, IS_ARTICLE_IMAGE_DATAURL } from "../../src/hooks/use-flags-global";
//
export default function ChooseImage({
  //
  id,
  children,
  //
  GLOBAL_FILE = ARTICLE_IMAGE_FILE,
  GLOBAL_DATAURL = ARTICLE_IMAGE_DATAURL,
  ...rest
  //
}) {
  const ID = `FILECHOOSEIMAGE${id}`;
  const isMounted = useIsMounted();
  const globals = useGlobals();
  const {toggle: toggleFlags} = useFlags();
  //
  const [read, __] = useFileReader();
  const onChange = (evt) => {
    const file = evt?.target?.files[0];
    //
    // evt.target.value doesnt change when component removes image
    // and if re-choosing the same image it wont work
    // .. handle .value somehow; send {file, target} to `.set` 
    // .. so that it can be removed with `evt.target.value = ""`
    //
    if (isMounted && file) {
      read(file);
      globals.set(GLOBAL_FILE, 
        { 
          file, 
          target: evt?.target 
      });
    }
  };
  useEffect(() => {
    if (!__.error && !__.loading && __.url) {
      globals.set(GLOBAL_DATAURL, __.url);
      toggleFlags.on(IS_ARTICLE_IMAGE_DATAURL);
    }
  }, [__.error, __.loading, __.url]);
  //
  return (
    <label htmlFor={ID} {...rest}>
      {children}
      <input
        onChange={onChange}
        type="file"
        id={ID}
        name={ID}
        className="sr-only !hidden"
      />
    </label>
  );
}
