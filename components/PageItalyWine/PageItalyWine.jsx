import React from "react";

import NavCountriesPagesLinks from "../NavCountriesPagesLinks/NavCountriesPagesLinks";
import css from "./PageItalyWine.module.css";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";
//
import LinkPreviewGallery from "../LinkPreviewGallery/LinkPreviewGallery";
//
// "italy-gallery/01.italy-wine-map.jpg",
// "italy-gallery/02.italy-sangiovese.jpg",
// "italy-gallery/03.italy-nebbiolo-grape.jpg",
// "italy-gallery/04.italy-barolo.jpg",
// "italy-gallery/05.italy-barbaresco.jpg",
// "italy-gallery/06.italy-dolcetto.jpg",
// "italy-gallery/07.italy-barbera.jpg",
// "italy-gallery/08.italy-moscato.jpg",
// "italy-gallery/09.italy-prosecco.jpg",
// "italy-gallery/10.italy-soave.jpg",
// "italy-gallery/11.italy-amarone.jpg",
// "italy-gallery/12.italy-piedmont.jpg",
// "italy-gallery/13.italy-docg.jpg",
// "italy-gallery/14.italy-chianti.jpg",
// "italy-gallery/15.italy-montepulciano.jpg",
// "italy-gallery/16.italy-brunelo.jpg",
// "italy-gallery/17.italy-chianti.jpg",
// "italy-gallery/18.italy-super-tuscan.jpg",
// "italy-gallery/19.italy.best-value-wines.jpg",
// "italy-gallery/20.veneto-wine-region-italy.jpg",
// "italy-gallery/21.pinot-grigio-veneto.jpg",
// "italy-gallery/22.tuscany-wine-country.jpg",
// "italy-gallery/23.chianti-classico-italy.jpg",
//
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
            oko 400 zvanično zastupljenih sorti, obim i{" "}
            <LinkPreviewGallery startIndex={0}>
              raznolikost vina u Italiji
            </LinkPreviewGallery>{" "}
            su zapanjujući. Na bezbrojnim varijacijama podnjeblja i mikroklime,
            od maglovitih Alpa na severu, brdovitih mediteranskih obala u
            centralnom delu, do mirnijih seoskih krajeva i ostrva na jugu,
            mnogostrani italijanski <em>terroir</em>, podloga autohtonih sorti{" "}
            <LinkPreviewGallery startIndex={1}>
              <em>Sangiovese</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery startIndex={2}>
              <em>Nebbiolo</em>
            </LinkPreviewGallery>
            , <em>Aglianico</em> i{" "}
            <LinkPreviewGallery startIndex={6}>
              <em>Barbera</em>
            </LinkPreviewGallery>
            , ima ponešto za svačiji ukus.
          </p>
          <LeadBreak />
          <p>
            <LinkPreviewGallery startIndex={3}>
              <em>Barolo</em>
            </LinkPreviewGallery>{" "}
            i{" "}
            <LinkPreviewGallery startIndex={4}>
              <em>Barbaresco</em>
            </LinkPreviewGallery>
            , vina severozapadne regije{" "}
            <LinkPreviewGallery startIndex={11}>
              <em>Piedmont</em>
            </LinkPreviewGallery>{" "}
            su prvoklasna crna vina sorte Nebbiolo. Robusna, suva vina sa aromom
            jagode, katrana, ruže, tartufa, izraženih kiselina i tanina, ova
            vina dobijaju pun oblik nakon dužeg odležavanja od bar tri godine.{" "}
            <LinkPreviewGallery startIndex={5}>
              <em>Dolcetto</em>
            </LinkPreviewGallery>{" "}
            i <em>Barbera</em> su više pristupačna kvalitetna crna vina voćnih
            karakteristika i idelna kombinacija uz jela od testenine na bazi
            paradjz sosa. Od belih, u poslednjiih par decenija, slatkasto i
            blago penušavo vino{" "}
            <LinkPreviewGallery startIndex={7}>
              <em>Moscato d&apos;Asti</em>
            </LinkPreviewGallery>{" "}
            ima sve više uspeha.
          </p>
          <p>
            Ka istoku prema Veneciji, oblasti{" "}
            <LinkPreviewGallery startIndex={19}>Veneto</LinkPreviewGallery> i
            Friuli poznate su po penušavom belom vinu{" "}
            <LinkPreviewGallery startIndex={8}>
              <em>Prosecco</em>
            </LinkPreviewGallery>
            , osevežavajućem belom vinu{" "}
            <LinkPreviewGallery startIndex={9}>
              <em>Soave</em>
            </LinkPreviewGallery>{" "}
            sorti <em>Glera</em>, <em>Garganega</em>,{" "}
            <LinkPreviewGallery startIndex={20}>
              <em>Pinot Grigio</em>
            </LinkPreviewGallery>
            , i bogatim crnim vinima <em>Valpolicella</em> i{" "}
            <LinkPreviewGallery startIndex={10}>
              <em>Amarone</em>
            </LinkPreviewGallery>{" "}
            od sorti <em>Corvina</em>, <em>Rondinella</em>, <em>Molinara</em>.
          </p>
          <p>
            Pored Dantea i Leonarda, Siene i Firence, krovova od terakote i
            krivog tornja u Pizi, centralna regija{" "}
            <LinkPreviewGallery startIndex={21}>Toskana</LinkPreviewGallery>{" "}
            proizvela je i red najtraženijih svetskih vina. Sve apelacije ovog
            područja su{" "}
            <LinkPreviewGallery startIndex={12}>DOCG</LinkPreviewGallery> (
            <em>Denominazione di Origine Controllata e Garantita</em>) sto je
            ekvivalent PDO propisa evropske unije. Vina{" "}
            <LinkPreviewGallery startIndex={16}>
              <em>Chianti</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery startIndex={14}>
              <em>Vino Nobile di Montepulciano</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery startIndex={15}>
              <em>Brunello di Montalcino</em>
            </LinkPreviewGallery>
            , e <em>Carmignano</em> su vina najvišeg statusa i najviše se
            izvoze. Promenjliva nadmorska visina, peščarno glineno zemljište i
            brdovita mediteranska obala idealna su osnova za glavnu sortu{" "}
            <em>Sangiovese</em> koja daje koncetrisana crna vina izraženih
            kiselina arome višnje, crevnog bobičastog voća i duvana. Chianti
            vina su idealna kombinacija uz specijalitete sa lokalnog menija;
            testenina, pršut, pečena piletina, divljač na žaru, dimljeni
            parmezan, idealno ako su rashvlađena na oko 16 &deg;C.
          </p>
          <p>
            Sedamdesetih godina dvadesetog veka javlja se novi trend proizvodnje
            vina u Italiji kada internacionalne sorte Cabernet S., Merlot, Syrah
            ulaze u kupaže lokalnih sorti. Ovi{" "}
            <LinkPreviewGallery startIndex={17}>
              &apos;Super-Toskanci&apos;
            </LinkPreviewGallery>{" "}
            <em>Sassicaia</em>, <em>Solaia</em>, <em>Tignanello</em> i dr. su
            kvalitetna crna vina &apos;sa stranim uticajem&apos; ali ona ne
            ispunjavaju uslove za DOC (
            <em>Denominazione di Origine Controllata</em>) etiketu s obzirom da
            se ne proizvode na{" "}
            <LinkPreviewGallery startIndex={22}>
              Chianti području
            </LinkPreviewGallery>
            . Ova vina nose IGT (<em>Indicazione Geografica Tipica</em>)
            etiketu, tj. vina sa geografskim poreklom, što je ekvivalent PGI
            specifikacije EU.
          </p>
          <p>
            Uopšteno govoreći, Barolo i{" "}
            <LinkPreviewGallery startIndex={13}>
              <em>Chianti Clasicco</em>
            </LinkPreviewGallery>{" "}
            smatraju se za najveća italijanska vina. Međutim, proizvodnja vina
            ovde je toliko ogromna i raznolika, da nominovanje bilo koje regije
            ili vina kao najboljih izgleda potpuno apsurdno. Čak i unutar
            Pijemonta, Barbaresco bi mogao da ide rame uz rame sa Barolom, a u
            Toskani Brunelo di Montalcino i Vino Nobile di Montepulcciano bi
            mogli da se ravnopravno porede sa Chianti vinima.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageItalyWine;
//
