import React from "react";

import NavCountriesPagesLinks from "../NavCountriesPagesLinks/NavCountriesPagesLinks";
import css from "./PageItalyWine.module.css";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";
//
const PageItalyWine = () => {
  return (
    <>
      <NavCountriesPagesLinks />
      <div
        className={`${css.bgItaly} overflow-y-auto scrollbar-thin p-6 mt-8 indent-8 space-y-8`}
        style={{
          height: "calc(100% - 1.5rem)",
        }}
      >
        <article className="prose">
          <p>
            Najveći proizvođač i izvoznik vina u svetu, sa tradicijom dugom
            preko četiri milenujuma, brojem sorti, stilova i apelacija Italija s
            pravom nosi titule vinograda Evrope i vinskog lidera u Svetu!
            Prisustvo italijanksog vina na globalnom tržištu je oko 20% i
            izvoznik je u sve zemlje sveta. Sa preko 500 priznatih{" "}
            <abbr title="Protected Destionation of Origin">PDO</abbr> i{" "}
            <abbr title="Protected Geographic Indication">PGI</abbr> apelacija,
            oko 400 zvanično zastupljenih sorti, obim i raznolikost vina u
            Italiji su zapanjujući. Na bezbrojnim varijacijama podnjeblja i
            mikroklime, od maglovitih Alpa na severu, brdovitih mediteranskih
            obala u centralnom delu, do mirnijih seoskih krajeva i ostrva na
            jugu, mnogostrani italijanski <em>terroir</em>, podloga autohtonih
            sorti <em>Sangiovese</em>, <em>Nebbiolo</em>, <em>Aglianico</em> i{" "}
            <em>Barbera</em>, ima ponešto za svačiji ukus.
          </p>
          <LeadBreak />
          <p>
            <em>Barolo</em> i <em>Barbaresco</em>, vina severozapadne regije{" "}
            <em>Piedmont</em> su prvoklasna crna vina sorte Nebbiolo. Robusna,
            suva vina sa aromom jagode, katrana, ruže, tartufa, izraženih
            kiselina i tanina, ova vina dobijaju pun oblik nakon dužeg
            odležavanja od bar tri godine. <em>Dolcetto</em> i <em>Barbera</em>{" "}
            su više pristupačna kvalitetna crna vina voćnih karakteristika i
            idelna kombinacija uz jela od testenine na bazi paradjz sosa. Od
            belih, u poslednjiih par decenija, slatkasto i blago penušavo vino{" "}
            <em>Moscato d&apos;Asti</em> ima sve više uspeha.
          </p>
          <p>
            Ka istoku prema Veneciji, oblasti Veneto i Friuli poznate su po
            penušavom belom vinu <em>Prosecco</em>, osevežavajućem belom vinu{" "}
            <em>Soave</em> sorti <em>Glera</em>, <em>Garganega</em>, i po
            laganim crnim vinima <em>Valpolicella</em> i <em>Amarone</em> od
            sorti <em>Corvina</em>, <em>Rondinella</em>, <em>Molinara</em>.
          </p>
          <p>
            <strong>@TODO.article</strong> Italy, the home of Chianti, Barolo,
            Prosecco, Valpolicella, Soave, Orvieto, Etna, has a rich and diverse
            wine heritage dating back more than four thousand years. Famous for
            its bewildering diversity of both grape varieties and wine styles,
            Italy is also significant for the sheer volume of wine it produces:
            just over 5.6 billion liters in 2018, from 695,000 hectares of
            vineyards.
          </p>
          <p>
            It is rivaled in this regard only by France and Spain, and in 2018
            the country produced roughly 19 percent of the world&apos;s wines.
          </p>
          <p>
            Managing and marketing such a vast wine portfolio is no easy task,
            particularly in today&apos;s highly competitive wine market. The
            Italian government&apos;s system of wine classification and labeling
            uses a four-tier quality hierarchy made up of more than 500 DOCG,
            DOC/DOP and IGT titles. See Italian Wine Labels.
          </p>
          <p>
            Italy is divided into 20 administrative regions, all of which
            produce wine, and all of which contain several wine regions. The
            most significant, when both quality and quantity are taken into
            consideration, are Tuscany, Piedmont and Veneto.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageItalyWine;
//
