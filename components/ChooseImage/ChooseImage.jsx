import React, { useEffect } from "react";
import useIsMounted from "../../src/hooks/use-is-mounted";
import useFileReader from "../../src/hooks/use-file-reader";
import {
  useGlobals,
  ARTICLE_IMAGE_DATAURL,
  ARTICLE_IMAGE_FILE,
} from "../../src/hooks/use-globals";
//
export default function ChooseImage({
  //
  children,
  //
  id = "fileChooseImage",
}) {
  const isMounted = useIsMounted();
  const globals = useGlobals();
  //
  const [read, __] = useFileReader();
  const onChange = (evt) => {
    const file = evt?.target?.files[0];
    if (isMounted && file) {
      read(file);
      globals.set(ARTICLE_IMAGE_FILE, file);
    }
  };
  useEffect(() => {
    if (!__.error && !__.loading && __.url) 
      //
      globals.set(ARTICLE_IMAGE_DATAURL, __.url);
  }, [__.error, __.loading, __.url]);
  //
  return (
    <label htmlFor={id}>
      {children}
      <input
        onChange={onChange}
        type="file"
        id={id}
        name={id}
        className="sr-only !hidden"
      />
    </label>
  );
}
