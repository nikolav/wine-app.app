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
export const galleryImagesFrance = [
  "gallery-france/01.wine-map.jpg",
  "gallery-france/02.chatenuaf-du-pape-francuska-vino.jpg",
  "gallery-france/03.wine-press-ancient-rome.jpg",
  "gallery-france/04.battle-phyloxera-france.jpg",
  "gallery-france/05.france-bordeaux-overview.jpg",
  "gallery-france/06.france-bordeaux-map.jpg",
  "gallery-france/07.france-bordeaux-city.jpg",
  "gallery-france/08.cabernet-sauvignon.jpg",
  "gallery-france/09.merlot-grape-france.jpg",
  "gallery-france/10.cabernet-franc-grape.jpg",
  "gallery-france/11.malbec-grape.jpg",
  "gallery-france/12.petit-verdot-grape.jpg",
  "gallery-france/13.carmenere-grape.jpg",
  "gallery-france/14.bordeux-wine-grand-cru.jpg",
  "gallery-france/15.saint-emilion-pomerol-wine.jpg",
  "gallery-france/16.aoc-pyramid-france.jpg",
  "gallery-france/17.bordeux-classification-cru.jpg",
  "gallery-france/18.chateau-haut-brion.jpg",
  "gallery-france/19.chateau-margaux.jpg",
  "gallery-france/20.chateau-latour-bordeux.jpg",
  "gallery-france/21.lafite-bordeux.jpg",
  "gallery-france/22.mouton-rothschild.jpg",
  "gallery-france/23.sauternes.jpg",
  "gallery-france/24.botrytis-grapes.jpg",
  "gallery-france/25.burgundy-france.jpg",
  "gallery-france/26.burgundy-france.jpg",
  "gallery-france/27.burgundy-france.jpg",
  "gallery-france/28.pinot-noir.jpg",
  "gallery-france/29.chardonnay.jpg",
  "gallery-france/30.chablis.jpg",
  "gallery-france/31.chablis.jpg",
  "gallery-france/32.chablis.jpg",
  "gallery-france/33.burgundy.jpg",
  "gallery-france/34.burgundy.jpg",
  "gallery-france/35.burgundy-wine.jpg",
  "gallery-france/36.burgundy-wine.jpg",
  "gallery-france/37.champagne-wine-map.jpg",
  "gallery-france/38.champagne.jpg",
  "gallery-france/39.champagne-vinyard.jpg",
].map((src) => ({ src }));
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
