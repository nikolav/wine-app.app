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
  "gallery-spain/04.river-ebro-rioja.jpg",
  "gallery-spain/05.winesearch-best-value.png",
  "gallery-spain/06.wine-classification-spain.png",
  "gallery-spain/07.wine-classification-pdo-spain.png",
  "gallery-spain/08.spain-wine-classification-age.png",
  "gallery-spain/09.spain-wine-classification-age.png",
  "gallery-spain/10.crianza-rioja.jpg",
  "gallery-spain/11.crianza-rioja.jpg",
  "gallery-spain/12.reserva-rioja.jpg",
  "gallery-spain/13.reserva-rioja.jpg",
  "gallery-spain/14.reserva-rioja.jpg",
  "gallery-spain/15.rioja-gran-reserva.jpg",
  "gallery-spain/16.rioja-gran-reserva.jpg",
  "gallery-spain/17.rioja-gran-reserva.jpg",
  "gallery-spain/18.rioja-gran-reserva.jpg",
  "gallery-spain/19.spain-rioja.jpg",
  "gallery-spain/20.spain-ribera-del-duero.jpg",
  "gallery-spain/21.spain-priorato.jpg",
  "gallery-spain/22.castilla-y-leon-vinyard-spain.jpg",
  "gallery-spain/23.catalonia-wine-region-cava-spain.jpg",
  "gallery-spain/24.jerez-bodega-sharry-andalucia.jpg",
  "gallery-spain/25.jerez-bodega-sharry-andalucia.jpg",
  "gallery-spain/26.spain-rioja.jpg",
  "gallery-spain/27.spain-ribera-del-duero.jpg",
  "gallery-spain/28.galicia-wine-region-spain.jpg",
  "gallery-spain/29.grape-albarino-galicia-spain.jpg",
  "gallery-spain/30.albarino-wine-galicia-spain.jpg",
  "gallery-spain/31.rioja-wines.jpg",
  "gallery-spain/32.crianza-rioja.jpg",
  "gallery-spain/33.tempranillo-grape-spain.jpg",
  "gallery-spain/34.cava-sparkling-wine-spain.jpg",
  "gallery-spain/35.prosecco-champagne-cava-sparkling-wine.jpg",
  "gallery-spain/36.sherry-jerez-de-la-frotnera.jpg",
  "gallery-spain/37.sherry-jerez.jpg",
  "gallery-spain/38.sherry-types-jerez.png",
  "gallery-spain/39.palomino-grape-spain.jpg",
  "gallery-spain/40.consejo-regulador-doc-spain.jpg",
  "gallery-spain/41.consejo-regulador-rioja-quality-control-stamps.jpg",
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
