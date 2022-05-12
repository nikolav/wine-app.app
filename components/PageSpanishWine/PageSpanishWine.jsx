import React from "react";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";

import NavCountriesPagesLinks from "../NavCountriesPagesLinks/NavCountriesPagesLinks";
import { bgSpain } from "./PageSpanishWine.module.css";

//
const PageSpanishWine = () => {
  return (
    <>
      <NavCountriesPagesLinks />
      <div
        className={`${bgSpain} overflow-y-auto scrollbar-thin p-6 mt-8 indent-8 space-y-8`}
        style={{
          height: "calc(100% - 1.5rem)",
        }}
      >
        <article className="prose">
          <p>
            <strong>@TODO.article</strong> A country rich in viticultural
            history, grape vines have been grown on the Spanish Iberian
            Peninsula since at least 3000 B.C. It was not until 1000 B.C. that
            winemaking began here in earnest, a skill brought by Phoenician
            traders from the eastern Mediterranean. Today, the country is home
            to more vines than any other country on Earth, and has a national
            wine output exceeded only by France and Italy.
          </p>
          <LeadBreak />
          <p>
            Spain is a land of breathtaking landscapes, colorful history and a
            deep, complex culture in which wine has long played an important
            role.
          </p>
          <p>
            All seventeen of Spain&apos;s administrative regions produce wine to
            some extent, including the Canary Islands and Balearic Islands. The
            greatest concentration of vineyards is in Castilla-La Mancha, but
            the finest and most famous wines come from Galicia, Catalonia,
            Andalucia, Castilla y Leon and of course Rioja.
          </p>
          <p>
            The topography plays a fundamental role in defining Spain&apos;s
            many wine styles. From cool, green Galicia and the snow-capped
            Pyrenees in the north, via the parched central plateau, to sandy,
            sunny Andalucia in the south, the Spanish landscape is very diverse.
            The country spans seven degrees of latitude, leaving 800 kilometers
            between its Atlantic and Mediterranean coasts.
          </p>
          <p>
            Spain&apos;s wine grape varieties are less numerous than their
            European counterparts. They also receive far less fanfare as the
            Spanish wine industry has only recently begun to show any interest
            in varietal-led winemaking and marketing. Several hundred varieties
            are used in Spanish vineyards to some extent, but the vast majority
            of Spanish wine is made from just a small number of these. The key
            red-wine varieties, in order of acreage, are Tempranillo, Bobal,
            Garnacha and Monastrell. The leading white-wine varieties are Airen,
            Viura/Macabeo and Palomino and Albarino.
          </p>
          <p>
            Historically, winemaking culture throughout Spain is very rustic and
            steeped in traditions of the Old World. Oxidised styles are common
            as well as the heavy use of American oak for lengthy periods of
            barrel ageing.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageSpanishWine;
