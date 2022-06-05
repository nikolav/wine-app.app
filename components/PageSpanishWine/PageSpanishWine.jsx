import React from "react";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";
import LinkPreviewGallery, {
  GALLERY_SPAIN,
} from "../LinkPreviewGallery/LinkPreviewGallery";
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
            Topografski ekstrem dominira većim delom španskog poluostrva.{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={1}>
              Planinski venci Pirineja
            </LinkPreviewGallery>
            , centralna visoravan i brojni planinski lanci (<em>cordillera</em>
            ), nepovoljno utiču na klimatske uslove pogodne za uspešno
            vinogradarstvo. Iako okružen Mediteranom i Atlanskim okeanom glavni
            deo poluostrva izolovan je planinskim masivom gde većim delom godine
            vlada sušni period. Leti temperature idu preko 40&deg;C zimi ispod
            -20&deg;C. Padavine su retke, oko 300mm godišnje i to u iznenadnim
            pljuskovima kada poplave predstavljaju rizik ne samo za vinogradare.
          </p>
          <p>
            Uprkos tome{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={0}>
              Španija
            </LinkPreviewGallery>{" "}
            je redu{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={2}>
              najvećih proizvođača vina
            </LinkPreviewGallery>{" "}
            u svetu (drugo mesto odmah iza Italije) i zemlja sa ubedljivo
            najvećim brojem vinograda. Na preko 10 hiljada kvadratnih kilometara
            pod vinovom lozom (13% ukupne teritorije) broj zasada ide preko
            4300. Iza uspeha španskog vinarstva u stvari stoje reke{" "}
            <em>Miño</em>, <em>Duero</em>, <em>Tajo</em>, <em>Guadiana</em> i{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={3}>
              <em>Ebro</em>.
            </LinkPreviewGallery>{" "}
            Na izolovanim delovima planinskih lanaca ove &apos;vinske reke&apos;
            su nepresušan izvor vode i okosnica makroklimatskih preduslova za
            bavljenje vinogradarstvom.
          </p>
          <LeadBreak />
          <p>
            Sistem klasifikacije vina ovde je dvojak:{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={5}>
              klasična <abbr title="Protected Destionation of Origin">PDO</abbr>{" "}
              podela
            </LinkPreviewGallery>{" "}
            i karakteristično za Španiju, kategorije zasnovane na dužini
            odležavanja vina. Evropska klasifikacija vina ovde je
            pojednostavljena u dve grupe: DO/DOC (
            <em>denominacion de origen, e denominacion de origen calificada</em>
            ) i na grupu u koju ulaze ostala vina širokog spektra stilova i
            kvaliteta, VDM/VDT/VCIG (
            <em>
              vino de mesa, vino de la tierra, vino de calidad con indicacion
              geografica
            </em>
            ).{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={40}>
              DO etiketu
            </LinkPreviewGallery>{" "}
            odobrava regulacioni konsultant (
            <em>
              <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={39}>
                consejo regulador
              </LinkPreviewGallery>{" "}
            </em>
            ), zakonski privilegovano telo koje imenuje kategorije vina i za
            sada samo dve oblasti nose ovu najvišu titulu, Rioja (odobrena 1991.
            godine) i Priorat(2009).
          </p>
          <p>
            Popularnije su podele crvenog vina bazirane na{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={7}>
              dužini odležavanja.
            </LinkPreviewGallery>{" "}
            <em>&apos;Joven&apos;</em> su mlada vina koja nisu odležala. Vina{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={9}>
              <em>&apos;Crianza&apos;</em>
            </LinkPreviewGallery>{" "}
            odležavaju 6 meseci u buretu i 2 godine ukupno. Vina{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={11}>
              <em>&apos;Reserva&apos;</em>
            </LinkPreviewGallery>{" "}
            odležavaju godinu dana u buretu a ukupno 3 godine.{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={14}>
              <em>&apos;Gran Reserva&apos; </em>
            </LinkPreviewGallery>{" "}
            vina su najstarija, i pored odležavanja od 18 meseci u buretu i 5
            godina ukupno ova vina prolaze proces oksidacije tj. izložena su
            uticaju vazduha, svetlosti i toplote radi naglašavanja aroma
            nastalih odležavanjem.
          </p>
          <p>
            Najtraženija vina Španije su iz oblasti{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={18}>
              <em>Rioja</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={21}>
              <em>Castilla y Leon</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={19}>
              <em>Ribera del Duero</em>
            </LinkPreviewGallery>
            ,{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={22}>
              <em>Catalonia </em>
            </LinkPreviewGallery>{" "}
            (
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={20}>
              <em>Priorat</em>
            </LinkPreviewGallery>
            , <em>Penedez</em>), <em>Galicia</em>, <em>Andalucia</em> (
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={23}>
              <em>Jerez</em>
            </LinkPreviewGallery>
            ).{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={27}>
              Sa severo-zapada
            </LinkPreviewGallery>{" "}
            dolaze lagana osvežavajuća bela vina cvetnih aroma sorti{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={28}>
              <em>Albariño</em>
            </LinkPreviewGallery>{" "}
            i <em>Verdejo</em>. Centrlni deo Rioja, Ribera del Duero, Castilla y
            Leon, <em>Castilla la Mancha</em>, karakterišu bogata{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={30}>
              crvena vina klasičnog stila
            </LinkPreviewGallery>{" "}
            aroma crvenog voća, hrasta, koštunica, vanile, bazirana na
            najzastupljenijoj sorti{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={32}>
              <em>Tempranillo</em>
            </LinkPreviewGallery>{" "}
            , <em>Garnacha</em>, <em>Mazuelo</em>, <em>Graciano</em>, i kupažama
            internacionalnih sorti. Iz Katalonije je i španska verzija
            francuskog šampanjca, penušavo belo vino{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={34}>
              <em>Cava</em>
            </LinkPreviewGallery>{" "}
            sorti <em>Macabeo</em>, <em>Parellada</em>, <em>Xarello</em>.{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={35}>
              <em>Sherry</em>
            </LinkPreviewGallery>{" "}
            je originalno fortifidovano vino sorte
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={38}>
              {" "}
              <em>Palomino</em>
            </LinkPreviewGallery>{" "}
            sa juga zemlje <em>(Jerez, Andalucia)</em>. Procenat alkohola sherry
            vina varira od 16% do 22% zavisno od stila i klasifikovano je{" "}
            <LinkPreviewGallery gallery={GALLERY_SPAIN} startIndex={37}>
              prema stepenu oksidacije
            </LinkPreviewGallery>{" "}
            na <em>fino</em>, <em>amontillado</em> i <em>oloroso</em>.
          </p>
          <p>
            Iako često kritikovana za svoj &apos;grub, zaostao i
            neprofesinalan&apos; pristup proizvodnji vina, španska tradicionalna
            crvena punokrvna vina dobro odležala u buretu (
            <em>Rioja Reserva</em>, <em>Vega Sicilia</em>, <em>Pingus</em>,{" "}
            <em>Tinto Pesquera</em>) redovno su na stolovima najskupljih
            restorana kao odlična kombinacija sa starijim sirevima i sušenim
            mesom.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageSpanishWine;
