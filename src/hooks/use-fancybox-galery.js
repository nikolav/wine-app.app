import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

// https://fancyapps.com/docs/ui/fancybox/options
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

  function openGallery(images = [], options = {}) {
    return setGallery(Fancybox.show(images, { ...defaultOptions, ...options }));
  }
}

/*
// 
import useFancyboxGallery from "./hooks/use-fancybox-gallery";
const { gallery, openGallery } = useFancyboxGallery();
//
//
const images = [
    {
      src: <image>,
      caption: <:string>,
      thumb: <image-sm>
    },
    // ...
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
