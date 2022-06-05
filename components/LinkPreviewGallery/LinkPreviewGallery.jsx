import React from "react";
import useFancyboxGallery from "../../src/hooks/use-fancybox-galery";
//
export const GALLERY_ITALY = "gallery.italy";
export const GALLERY_SPAIN = "gallery.spain";
export const GALLERY_FRANCE = "gallery.france";
export const GALLERY_USA = "gallery.usa";
//
export const galleryImagesItaly = [
  "italy-gallery/01.italy-wine-map.jpg",
  "italy-gallery/02.italy-sangiovese.jpg",
  "italy-gallery/03.italy-nebbiolo-grape.jpg",
  "italy-gallery/04.italy-barolo.jpg",
  "italy-gallery/05.italy-barbaresco.jpg",
  "italy-gallery/06.italy-dolcetto.jpg",
  "italy-gallery/07.italy-barbera.jpg",
  "italy-gallery/08.italy-moscato.jpg",
  "italy-gallery/09.italy-prosecco.jpg",
  "italy-gallery/10.italy-soave.jpg",
  "italy-gallery/11.italy-amarone.jpg",
  "italy-gallery/12.italy-piedmont.jpg",
  "italy-gallery/13.italy-docg.jpg",
  "italy-gallery/14.italy-chianti.jpg",
  "italy-gallery/15.italy-montepulciano.jpg",
  "italy-gallery/16.italy-brunelo.jpg",
  "italy-gallery/17.italy-chianti.jpg",
  "italy-gallery/18.italy-super-tuscan.jpg",
  "italy-gallery/19.italy.best-value-wines.jpg",
  "italy-gallery/20.veneto-wine-region-italy.jpg",
  "italy-gallery/21.pinot-grigio-veneto.jpg",
  "italy-gallery/22.tuscany-wine-country.jpg",
  "italy-gallery/23.chianti-classico-italy.jpg",
].map((src) => ({ src }));
//
export const galleryImagesSpain = [
  "gallery-spain/01.spain-wine-map.jpg",
  "gallery-spain/02.spain-topographic-map.jpg",
  "gallery-spain/03.global-wine-production.jpg",
].map((src) => ({ src }));
export const galleryImagesFrance = ["italy-gallery/01.italy-wine-map.jpg"].map(
  (src) => ({ src })
);
export const galleryImagesUSA = ["italy-gallery/01.italy-wine-map.jpg"].map(
  (src) => ({ src })
);

//
const galleries = {
  [GALLERY_ITALY]: galleryImagesItaly,
  [GALLERY_SPAIN]: galleryImagesSpain,
  [GALLERY_FRANCE]: galleryImagesFrance,
  [GALLERY_USA]: galleryImagesUSA,
};
//
const LinkPreviewGallery = ({
  children,
  gallery = GALLERY_ITALY,
  startIndex = 0,
}) => {
  const { openGallery } = useFancyboxGallery();
  //
  return (
    <span
      className="link-preview"
      onClick={() => openGallery(galleries[gallery], { startIndex })}
    >
      {children}
    </span>
  );
};

export default LinkPreviewGallery;
