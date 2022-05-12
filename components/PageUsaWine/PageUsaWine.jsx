import React from "react";
import ArticleEnd from "../ArticleEnd";
import LeadBreak from "../LeadBreak";

import NavCountriesPagesLinks from "../NavCountriesPagesLinks/NavCountriesPagesLinks";
import { bgUsa } from "./PageUsaWine.module.css";
//
//
const PageUsaWine = () => {
  return (
    <>
      <NavCountriesPagesLinks />
      <div
        className={`${bgUsa} overflow-y-auto scrollbar-thin p-6 mt-8 indent-8 space-y-8`}
        style={{
          height: "calc(100% - 1.5rem)",
        }}
      >
        <article className="prose">
          <p>
            <strong>@TODO.article</strong> The United States&apos; reputation as
            a wine producer is to a large degree founded on the global fame of
            Napa and Sonoma. However the country is home to countless wine
            regions producing world-class wines.
          </p>
          <LeadBreak />
          <p>
            Wine has been made in The States for around 400 years, but it is
            only in the last 40 that American wine really began to earn respect
            on a global scale. The U.S. is now the world&apos;s fourth-biggest
            wine-producing nation and produces roughly 18.5 million hectoliters
            each year.
          </p>
          <p>
            The topographical, geological and climatic diversity of the American
            continent has provided the states with all manner of vine-growing
            conditions. These range from higher-altitude, continental climes to
            coastal, fog-laden areas.
          </p>
          <p>
            Wine has been produced in the U.S. since the early 17th century,
            when European colonization began in earnest. Repeated attempts were
            made by the early settlers, who brought with them the winemaking
            knowledge and practices of their European homelands.
          </p>
          <p>
            European vinifera vines were not shipped to the Americas in any
            quantity until the mid-17th century. These invariably suffered at
            the hands of native pests and fungal diseases. Over the next three
            centuries, it became clear that vine breeding and grafting were the
            keys to establishing a balance between manageable vines and
            palatable wines. Today, almost every wine-bearing vine in the U.S.
            is either a hybrid variety or a vinifera vine scion grafted onto the
            rootstock of a native variety.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageUsaWine;
