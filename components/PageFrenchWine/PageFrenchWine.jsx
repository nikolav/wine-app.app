import React from "react";

import NavCountriesPagesLinks from "../NavCountriesPagesLinks/NavCountriesPagesLinks";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";

//
const PageFrenchWine = () => {
  return (
    <>
      <NavCountriesPagesLinks />
      <div
        className="overflow-y-auto scrollbar-thin p-6 mt-8 space-y-8 indent-8"
        style={{
          height: "calc(100% - 1.5rem)",
        }}
      >
        <article className="prose">
          <p>
            <strong>@TODO.article</strong> Aided in no small part by a touch of
            Francophilia among most winelovers, France nonetheless boasts some
            of the greatest wine regions and benchmark wines on earth.
          </p>
          <p>
            France, the home of Bordeaux, Burgundy and Champagne, is arguably
            the world&apos;s most important wine-producing country. For
            centuries, it has produced wine in greater quantity, and of
            reportedly greater quality, than any other nation. Wine is ingrained
            in French culture at almost every level of society; it is the drink
            of both the elite and the common people, and a key symbol in Roman
            Catholicism, France&apos;s majority religion.
          </p>
          <p>
            The enduring attraction of French wine is not necessarily its volume
            or prestige, however, but rather the variety of styles available.
            Consumer preferences have changed over the centuries, encouraging
            the development of new styles of wine from the terrain and grape
            varieties available to France&apos;s vignerons. Red, white, rosé,
            sweet, dry, sparkling, opulent, austere, mineral-scented, fruity,
            French vineyards have produced wines to match each of these
            descriptors.
          </p>
          <LeadBreak />
          <p>
            The diversity of French wine is due, in part, to the country&apos;s
            wide range of climates. Champagne, its most northerly region, has
            one of the coolest climates anywhere in the wine-growing world, in
            stark contrast to the warm, dry Rhône Valley 560km away in the
            southeast.
          </p>
          <p>
            Indeed, geology and topography play equally important roles in the
            diversity of French wine. The country&apos;s large number of
            independently recognized wine regions and subregions reflects its
            wide range of soil types, and the landscapes that created them.
          </p>
          <p>
            Indeed, distillation often runs parallel to regional production.This
            includes both wine, such as Armagnac in the South West and the likes
            of Eau-de-Vie de Marc de Bourgogne in Burgundy, and cider, which in
            Normandy, in the north, gives rise to Calvados.
          </p>
          <p>
            Each region and subregion can be defined by its particular
            geographical features, which in turn create specific characteristics
            in the wines produced there. As with most wine regions, many
            winegrowing areas follow, or are adjacent to, alluvial systems and
            rivers, combining both favorable geography and, going back in time,
            transport for commerce.
          </p>
          <p>
            From the granite hills of Beaujolais to the famous chalky slopes of
            Chablis and the gravels of the Médoc, the sites on which
            France&apos;s vineyards have been developed are considered of vital
            importance and are at the heart of the concept of terroir.
          </p>
          <p>
            France&apos;s appellation system was created in the early 20th
            Century and has since been imitated in many other countries. This
            complex system of laws ultimately defines each wine region and its
            boundaries and imposes strict rules around winemaking practices.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageFrenchWine;
