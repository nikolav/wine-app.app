import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

//
export const defaultOptions = {
  Toolbar: {
    display: [{ id: "counter", position: "left" }, "fullscreen", "close"],
  }, 
  mainClass: "backdrop-blur-sm"
};
//
export default function useFancyboxGallery() {
  const [gallery, setGallery] = useState(null);

  return { gallery, openGallery };

  // images: object[], options: object
  function openGallery(images = [], options = {}) {
    return setGallery(Fancybox.show(images, { ...defaultOptions, ...options }));
  }
}

/*
// https://fancyapps.com/docs/ui/fancybox/options
import useFancyboxGallery from "./hooks/use-fancybox-gallery";
const { gallery, openGallery } = useFancyboxGallery();
//
//
const images = [
    {
      src: imageUploadHelpStep01,
      caption:
        "Naslov treba da bude kratak i precizan da bi se lako pojavio u pretrazi.",
    },
    {
      src: imageUploadHelpStep02,
      caption: "Sadržaj oglasa može da bude opširan i da sadrži ključne reči.",
    },
  ];

openGallery(images, {
  
  Toolbar: {
    display: [
      { id: "prev", position: "center" },
      { id: "counter", position: "center" },
      { id: "next", position: "center" },
      "zoom",
      "slideshow",
      "fullscreen",
      "download",
      "thumbs",
      "close",
    ],
  },
    

  });
*/
