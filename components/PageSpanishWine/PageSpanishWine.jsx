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
            Topografski ekstrem dominira većim delom španskog poluostrva.
            Planinski venci Pirineja, centralna visoravan i brojni planinski
            lanci (<em>cordillera</em>), nepovoljno utiču na klimatske uslove
            pogodne za uspešno vinogradarstvo. Iako okružen Mediteranom i
            Atlanskim okeanom glavni deo poluostrva izolovan je planinskim
            masivom gde većim delom godine vlada sušni period. Leti temperature
            idu preko 40&deg;C zimi ispod -20&deg;C. Padavine su retke, oko
            300mm godišnje i to u iznenadnim pljuskovima kada poplave
            predstavljaju rizik ne samo za vinogradare.
          </p>
          <p>
            Uprkos tome Španija je redu najvećih proizvođača vina u svetu (drugo
            mesto odmah iza Italije) i zemlja sa ubedljivo najvećim brojem
            vinograda. Na preko 10 hiljada kvadratnih kilometara pod vinovom
            lozom (13% ukupne teritorije) broj zasada je preko 4300. Iza uspeha
            španskog vinarstva u stvari stoje reke Miño, Duero, Tajo, Guadiana i
            Ebro. Na izolovanim delovima planinskih lanaca ove &apos;vinske
            reke&apos; su nepresušan izvor vode i okosnica makroklimatskih
            preduslova za bavljenje vinogradarstvom.
          </p>
          <LeadBreak />
          <p>
            Sistem klasifikacije vina ovde je dvojak: klasična PDO podela i
            karakteristično za Španiju, kategorije zasnovane na dužini
            odležavanja vina. Evropska klasifikacija vina ovde je
            pojednostavljena u dve grupe: DO/DOC (
            <em>denominacion de origen, e denominacion de origen calificada</em>
            ) i na grupu u koju ulaze ostala vina širokog spektra stilova i
            kvaliteta, VDM/VDT/VCIG (
            <em>
              vino de mesa, vino de la tierra, vino de calidad con indicacion
              geografica
            </em>
            ). DO etiketu odobrava regulacioni konsultant (
            <em>consejo regulador</em>), zakonski privilegovano telo koje
            imenuje kategorije vina i za sada samo dve oblasti nose ovu najvišu
            titulu, Rioja (odobrena 1991. godine) i Priorat(2009).
          </p>
          <p>
            Popularnije su podele crvenog vina bazirane na dužini odležavanja.{" "}
            <em>&apos;Joven&apos;</em> su mlada vina koja nisu odležala. Vina{" "}
            <em>&apos;Crianza&apos;</em> odležavaju 6 meseci u buretu i 2 godine
            ukupno. Vina <em>&apos;Reserva&apos;</em> odležavaju godinu dana u
            buretu a ukupno 3 godine. <em>&apos;Gran Reserva&apos; </em> vina su
            najstarija, i pored odležavanja od 18 meseci u buretu i 5 godina
            ukupno ova vina prolaze proces oksidacije tj. izložena su uticaju
            vazduha, svetlosti i toplote radi naglašavanja aroma nastalih
            odležavanjem.
          </p>
          <p>
            Najtraženija vina Španije su iz oblasti <em>Rioja</em>,{" "}
            <em>Castilla y Leon (Ribera del Duero)</em>,{" "}
            <em>Catalonia (Priorat, Penedez)</em>, <em>Galicia</em>,{" "}
            <em>Andalucia (Jerez)</em>. Sa severo-zapada dolaze lagana
            osvežavajuća bela vina cvetnih aroma sorti <em>Albariño</em> i{" "}
            <em>Verdejo</em>. Centrlni deo Rioja, Ribera del Duero, Castilla y
            Leon, <em>Castilla la Mancha</em>, karakterišu bogata crvena vina
            klasičnog stila aroma crvenog voća, hrasta, koštunica, vanile,
            bazirana na najzastupljenijoj sorti <em>Tempranillo</em>,{" "}
            <em>Garnacha</em>, <em>Mazuelo</em>, <em>Graciano</em>, i kupažama
            internacionalnih sorti. Iz Katalonije je i španska verzija
            francuskog šampanjca, penušavo belo vino <em>Cava</em> sorti{" "}
            <em>Macabeo</em>, <em>Parellada</em>, <em>Xarello</em>.{" "}
            <em>Sherry</em> je originalno fortifidovano vino sorte{" "}
            <em>Palomino</em> sa juga zemlje <em>(Jerez, Andalucia)</em>.
            Procenat alkohola sherry vina varira od 16% do 22% zavisno od stila
            i klasifikovano je prema stepenu oksidacije na <em>fino</em>,{" "}
            <em>amontillado</em> i <em>oloroso</em>.
          </p>
          <p>
            Iako često kritikovana za svoj &apos;grub, zaostao i
            neprofesinalan&apos; pristup proizvodnji vina, tradicionalna,
            punokrvna crvena španska vina dobro odležala u buretu (
            <em>Rioja Reserva</em>, <em>Vega Sicilia</em>, <em>Pingus</em>,{" "}
            <em>Tinto Pesquera</em>) često su na stolovima najskupljih restorana
            kao odlična kombinacija sa starijim sirevima i sušenim mesom.
          </p>
          <ArticleEnd />
        </article>
      </div>
    </>
  );
};

export default PageSpanishWine;
