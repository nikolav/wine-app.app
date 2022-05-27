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
            <em>Soave</em> sorti <em>Glera</em>, <em>Garganega</em>,{" "}
            <em>Pinot Grigio</em>, i bogatim crnim vinima <em>Valpolicella</em>{" "}
            i <em>Amarone</em> od sorti <em>Corvina</em>, <em>Rondinella</em>,{" "}
            <em>Molinara</em>.
          </p>
          <p>
            Pored Dantea i Leonarda, Siene i Firence, krovova od terakote i
            krivog tornja u Pizi, centralna regija Toskana proizvela je i red
            najtraženijih svetskih vina. Sve apelacije ovog područja su DOCG (
            <em>Denominazione di Origine Controllata e Garantita</em>) sto je
            PDO ekvivalent propisa evropske unije. Vina <em>Chianti</em>,{" "}
            <em>Vino Nobile di Montepulciano</em>,{" "}
            <em>Brunello di Montalcino</em>, e <em>Carmignano</em> su vina
            najvišeg statusa i najviše se izvoze.
          </p>
          <p>
            Promenjliva nadmorska visina, peščarno glineno zemljište i brdovita
            mediteranska obala idealna su osnova za sortu <em>Sangiovese</em>{" "}
            koja daje koncetrisana crna vina izraženih kiselina arome višnje,
            crevnog bobičastog voća i duvana. Chianti vina su idealna
            kombinacija uz specijalitete sa lokalnog menija; testenina, pršut,
            pečena piletina, divljač na žaru, dimljeni parmezan, idealno ako su
            rashvlađena na oko 16 &deg;C.
          </p>
          <p>
            Sedamdesetih godina dvadesetog veka javlja se novi trend proizvodnje
            vina u Italiji kada internacionalne sorte Cabernet S., Merlot, Syrah
            ulaze u kupaže lokalnih sorti. Ovi &apos;Super-Toskanci&apos;{" "}
            <em>Sassicaia</em>, <em>Solaia</em>, <em>Tignanello</em> i dr. su
            kvalitetna crna vina &apos;sa stranim uticajem&apos; ali ona ne
            ispunjavaju uslove za DOC (
            <em>Denominazione di Origine Controllata</em>) etiketu s obzirom da
            se ne proizvode na Chianti području. Ova vina nose IGT (
            <em>Indicazione Geografica Tipica</em>) etiketu, tj. vina sa
            geografskim poreklom, što je PGI ekvivalent specifikaciji EU.
          </p>
          <p>
            Uopšteno govoreći, Barolo i <em>Chianti Clasicco</em> smatraju se za
            najveća italijanska vina. Međutim, proizvodnja vina ovde je toliko
            ogromna i raznolika, da nominovanje bilo koje regije ili vina kao
            najboljih izgleda potpuno apsurdno. Čak i unutar Pijemonta,
            Barbaresco bi mogao da ide rame uz rame sa Barolom, a u Toskani
            Brunelo di Montalcino i Vino Nobile di Montepulcciano bi mogli da se
            ravnopravno porede sa Chianti vinima.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageItalyWine;
//
