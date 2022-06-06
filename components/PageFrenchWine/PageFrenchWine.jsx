import React from "react";
import NavCountriesPagesLinks from "../NavCountriesPagesLinks/NavCountriesPagesLinks";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";
import { bgFrance } from "./PageFrenchWine.module.css";
import LinkPreviewGallery, {
  GALLERY_FRANCE,
} from "../LinkPreviewGallery/LinkPreviewGallery";

//
//
const PageFrenchWine = () => {
  return (
    <>
      <NavCountriesPagesLinks />
      <div
        className={`${bgFrance} overflow-y-auto scrollbar-thin p-6 mt-8 space-y-8 indent-8`}
        style={{
          height: "calc(100% - 1.5rem)",
        }}
      >
        <article className="prose">
          <p>
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={0}>
              Francuska
            </LinkPreviewGallery>{" "}
            je zemlja sa jednom od najdužih tradicija proizvodnje vina u Evropi.
            Još su stari Grci ovde doneli vinovu lozu i počeli da formiraju i
            obelažavaju vinograde. Ovu veštinu s kolena na koleno prenose brojne
            kulture, narodi, crkva i svaka generacija ovde daje svoj doprinos.
            Kelti su prvi ustanovili vinogradarske tehnike, počeli sa
            orezivanjem vinograda i od divlje loze formirali grožđe za
            proizvodnju vina. Rimljani u vinarstvo uvode brojne regulacije,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={2}>
              proširuju proizvodnju
            </LinkPreviewGallery>{" "}
            i izvoz što im daje još sredstava za osvajačke pohode. Pojam{" "}
            <em>terroir</em> u vinogradarstvo su uveli monasi katoličke crkve,
            koja većim delom stoji iza statusa francuskog vina danas. Njihova
            zapažanja o uticaju sredine, topografije, brojnih prirodnih faktora
            na karakteristike berbe i kvalitet vina te godine (<em>cru</em>,{" "}
            <em>vintage</em>) danas su osnova brojnih klasifikacija francuskog
            vina.
          </p>
          <p>
            Kraj devetnaestog početak dvadestog veka je veliki test i
            &apos;mračan period&apos; francuskog vinarstva.{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={3}>
              Filoksera
            </LinkPreviewGallery>{" "}
            (vrsta parazita koji napada koren biljke), vinska buđ, zatim oba
            svetska rata malo nisu uništili francusku privredu vina. Procenjuje
            se da je čak 80% proizvođača i vinograda nestalo. Konkurecija je
            počela da postaje ozbijna pretnja preostalim francuskim vinarima.
            Imena kao <em>Bordo</em> i <em>Šampanja</em> počela su sve više da
            blede. Da bi očuvali svoj interes Francuzi uvode nove regulacije
            tehnologija i garancije kvaliteta vina da osiguraju svoje mesto.
            Godine 1935. posed{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={1}>
              <em>Châteauneuf-du-Pape</em>
            </LinkPreviewGallery>{" "}
            oblasti <em>Rona</em> dobija prvu apelaciju. Nakon brojnih ulaganja
            u oporavak privrede francusko vinarstvo staje na noge i{" "}
            <em>70ih</em> godina vraća se na modernu vinsku scenu.
          </p>
          <LeadBreak />
          <p>
            Jedna od najcenjenijih oblasti crvenog vina je{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={4}>
              Bordeux
            </LinkPreviewGallery>{" "}
            (Bordo). U slivu reka Dordogne, Garonne, Gironde, nadomak Atlanskog
            okeana preovladava topla primorska klima idealna za sazrevanje
            žilavijih crvenih sorti. Leva obala sliva (oblasti Medoc i Graves)
            je uglavnom šljunkovita što održava temperaturu vinograda stabilnom
            i tokom noći te sorte{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={7}>
              <em>Cabernet Sauvignon</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={8}>
              <em>Merlot</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={9}>
              <em>Cabernet Franc</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={10}>
              <em>Malbec</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={11}>
              <em>Petit Verdot</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={12}>
              <em>Carménère </em>
            </LinkPreviewGallery>
            poznate kao &apos;Bordo kupaža&apos; mogu da ostvare svoj pun
            potencijal.{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={13}>
              <em>Ovo </em>
            </LinkPreviewGallery>{" "}
            su intenzivna crvena tanična vina arome brusnice i crnog bobičastog
            voća idealna uz jela na bazi crvenog mesa, sa dužim periodom
            odležavanja. Peščane rečne naslage desne obale (oblasti{" "}
            <em>Pomerol</em> i <em>Saint-Émilion</em>) i malo svežjia vlažna
            klima su pogoduju sortama <em>Merlot</em>, <em>Cabernet Franc</em>,
            ponegde <em>Cabernet Sauvignon</em> i ovde daju{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={14}>
              <em>bogata crvena vina</em>
            </LinkPreviewGallery>{" "}
            herbalnih aroma i crvenog bobičastog voca.
          </p>
          <p>
            Pored standardne{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={15}>
              <em>klasifikacije AOC</em>
            </LinkPreviewGallery>{" "}
            , jedinstvena za Bordo je klasifikacija crvenih vina bazirana na{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={16}>
              <em>posedima vinograda</em>
            </LinkPreviewGallery>{" "}
            , slično modernom sistemu u USA gde su vina rangirana po tome koja
            kompanija je u pitanju. Ovi posedi (<em>Chateux</em>) su svrstani u
            jedan od nekoliko slojeva (<em>Cru</em>, ili{" "}
            <em>&apos;Grand Cru Classe&apos;</em> na etiketama): 1<sup>st</sup>
            ..5<sup>th</sup> <em>cru</em>, <em>cru</em> bourgeois i <em>cru</em>{" "}
            artisans. Od 87 poseda samo pet je u prvom sloju ove klasifikacije:{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={17}>
              <em>Château Haut-Brion</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={18}>
              <em>Château Margaux</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={19}>
              <em>Château Latour</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={20}>
              <em>Château Lafite</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={21}>
              <em>Château Mouton Rothschild</em>
            </LinkPreviewGallery>
            .
          </p>
          <p>
            Od belih vredno pomena je desertno vino{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={22}>
              <em>Sauternes</em>
            </LinkPreviewGallery>{" "}
            botritisovanih sorti <em>Sémillon</em>, <em>Sauvignon Blanc</em>,{" "}
            <em>Muscadelle</em>. Ovo grozđe zahvaćeno <em>Botrytis cinerea</em>{" "}
            gljivicom ima povećanu koncetraciju šećera koja ostaje nakon
            fermentacije.
          </p>
          <p>
            Ne manje značajna je oblast{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={24}>
              <em>Bourgogne (Burgonja)</em>
            </LinkPreviewGallery>{" "}
            više ka unutrašnjosti zemlje. Sveža kontinentalna klima pogodna je
            za sorte{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={27}>
              <em>Pinot Noir</em>
            </LinkPreviewGallery>{" "}
            i{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={28}>
              <em>Chardonnay</em>
            </LinkPreviewGallery>{" "}
            koje su najzastupljenije u ovoj oblasti. Za razliku od Bordo
            klasifikacije po veleposedima, ovde je podela izvršena po domeninma
            (vinograd, <em>cru</em>), delovima zemlje karakteristika koje su
            dosledne tom reonu (<em>terroir</em> klasifikacija). Ovde imamo
            četiri kategorije, <em>Grand cru</em>, <em>Premiere cru</em>,{" "}
            <em>Village cru</em>, <em>Regional cru</em> i rapodeljene su na
            nekoliko podoblasti. Malo izdvojena, severnije je oblast{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={29}>
              <em>Chablis (Šabli)</em>
            </LinkPreviewGallery>{" "}
            poznata po laganim belim vinima sorte <em>Chardonnay</em>{" "}
            osvežavajućeg, blago mineralnog ukusa arome zelene jabuke.{" "}
            <em>Côte de Nuits</em> i <em>Côte de Beaune</em> oblasti zajedno
            čine{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={32}>
              <em>Côte-d&apos;Or</em>
            </LinkPreviewGallery>{" "}
            (zlatna obala) oblast vina južno od <em>Dižona</em>, odakle dolaze
            najviše rangirana <em>Pinot Noir</em> i <em>Chardonnay</em> vina
            sveta. Dalje prema jugu oblasti <em>Chalonnaise</em>,{" "}
            <em>Mâconnais</em>, <em>Beaujolais</em> karakterišu rustična vina{" "}
            <em>village</em> i <em>regional</em> kategorija.
          </p>
          <p>
            Tehnika proizvodnje penušavog belog i rosé vina sorti{" "}
            <em>Chardonnay</em>, <em>Pinot Noir</em>, <em>Pinot Meunier</em>{" "}
            hladnije severne oblasti{" "}
            <LinkPreviewGallery gallery={GALLERY_FRANCE} startIndex={36}>
              <em>Champagne (Šampanja)</em>
            </LinkPreviewGallery>
            , može biti da je nastala slučajno. Vino je flaširano zimi pa kvasci
            nisu uspeli do kraja da odrade, te je fermentacija
            &apos;zaleđena&apos; da nastavi u zatvorenoj boci kada dođu topliji
            proleći dani. Na taj način mehurići (CO<sub>2</sub>) nisu isparili
            već su, na iznenađenje prisutnih, ostali &apos;zarobljeni&apos; u
            boci.
          </p>
          <p>
            Francuska privreda vina je model brojnim vinarskim praksama, dom je
            brojnim sortama vinove loze koje važe za internacionalne, model za
            prihaćen sistem apelacija evropskih zemalja (
            <abbr title="Appellation d'Origine Contrôlée">AOC</abbr>,{" "}
            <abbr title="Indication Géographique Protégée">IGP</abbr>,{" "}
            <em>Vin de France</em>), i njena vina su uzor ostalim vinarskim
            zemljama da slede.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageFrenchWine;
