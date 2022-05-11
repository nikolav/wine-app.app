import { useState, useEffect } from "react";
import md5 from "md5";

// https://www.gravatar.com/avatar/6621adb9b4f1ee95b68259a2553ac3ab?d=robohash&size=92
// d=monsterid|wavatar|robohash

const baseUrl = "https://www.gravatar.com/avatar";

export default function useGravatar(email, size) {
  const [gravatar, setGravatar] = useState("");
  const g = ".gravatar";

  useEffect(() => {
    const cached = localStorage.getItem(g);
    if (cached) return setGravatar(cached);

    setGravatar_(email || email_());
  }, []);

  return [gravatar, refreshGravatar_];

  //
  function setGravatar_(email) {
    const gravatarUrl = gravatarUrl_(email);
    localStorage.setItem(g, gravatarUrl);
    setGravatar(gravatarUrl);
  }
  //
  function refreshGravatar_() {
    const gravatarUrl = gravatarUrl_(email_());
    const gmg = new Image();
    gmg.onload = (evt) => {
      const src = evt.path[0].src || gravatarUrl;
      localStorage.setItem(g, src);
      setGravatar(src);
    };
    gmg.src = gravatarUrl;
  }
  //
  //
  function gravatarUrl_(email) {
    return `${baseUrl}/${md5(String(email).toLocaleLowerCase())}?d=${
      ["monsterid", "wavatar", "robohash"][Math.floor(Math.random() * 3)]
    }&size=${parseInt(size, 10)}`;
  }
  function email_() {
    return `g${Date.now()}@gravatar.com`;
  }
}
