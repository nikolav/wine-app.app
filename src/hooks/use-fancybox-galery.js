import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

//
export const defaultOptions = {
  Toolbar: {
    display: [
      { id: "counter", position: "left" },
      "download",
      "fullscreen",
      "close",
    ],
  },
  mainClass: "backdrop-blur-sm",
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
      src: <image>,
      caption:
        "Naslov treba da bude kratak i precizan da bi se lako pojavio u pretrazi.",
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
