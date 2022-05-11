import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

export default function useFancyboxGallery() {
  const [gallery, setGallery] = useState(null);

  return { gallery, openGallery };

  // input: object[], options: object
  function openGallery(...args) {
    return setGallery(Fancybox.show.apply(null, args));
  }
}

/*
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
        { id: "counter", position: "left" },
        "close",
        ],
    },
    });
*/
