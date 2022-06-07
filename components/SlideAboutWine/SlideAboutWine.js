import React from "react";
import LinkCell from "../LinkCell/LinkCell";
import SlideshowImages from "../SlideshowImages/SlideshowImages";
import NavCountriesAboutWine from "../NavCountriesAboutWine/NavCountriesAboutWine";
import LeadBreak from "../LeadBreak";
import ArticleEnd from "../ArticleEnd";
import Image from "next/image";
import imgPlaceholder from "../../public/hist/export/regioni10.jpg";

//
const ID_REGIONS = "cell-regions";

//
const SlideAboutWine = () => {
  return (
    <div className="relative grid grid-cols-2 gap-0 px-6">
      <LinkCell title="regioni" id={ID_REGIONS} classes="rounded-tl-2xl">
        <NavCountriesAboutWine id={ID_REGIONS} />
        <div
          id="slide-about-wine"
          className="indent-8 scrollbar-thin space-y-8 lg:absolute left-0 p-8 max-h-full !overflow-y-auto lg:w-7/12 pb-48"
        >
          <article className="prose">
            <p>
              Vino je sa nama od pamtiveka. Na brojnim arheološkim mestima
              nailazimo na ostatke keramičkog posuđa sa tragovima procesa
              fermentacije voća i žitarica koji ukazuju na niz organskih
              kiselina mahom prisutnih u vinu. Od drevne Kine sedmog milenijuma
              stare ere gde, radi poboljšanja opojnog efekta, pored lokalnih
              sorti voća u sastav vina ulazi i pirinač, preko Persije i bliskog
              istoka gde na reljefima vladajućih dinastija vidimo da ovi moćni
              imperatori na dar od pokorenih nacija dobijaju i brojne ćupove
              kvalitetnog vina, do drevnog Egipta odakle na papirusu dolaze
              zapisi o kulturi vina.. vino je već u svojim prvim koracima
              sastavni deo čovekovog života, nezamenljiv deo religijskih i
              paganskih obreda, obavezni pratilac na proslavama, i skupa
              razonoda za imućnije, izmedju ostalog.
            </p>
            <p>
              U zapadni svet vino dolazi preko Grka i Feničana. Upotrebom
              brojnih internacionalnih sorti vinove loze antička Grčka vinu daje
              svetski karakter. Radi pospešivanja aroma u opis vina uključuju
              aromatično bilje, nanu, bosiljak, karanfilić, mirisne začine iz
              uvoza, smolu, ponegde čak morsku vodu, što vinu najverovatnije
              daje novu mineralnu aromu. Zahvaljujući istraživačkom duhu
              Feničana, do četvrtog milenijuma starog doba vino je već
              rasprostranjeno širom Sredozemlja, Evrope, a time čitavim
              &quot;starim svetom&quot;.
            </p>
            <LeadBreak />
            <p>
              Brojni sistemi klasifikacija vina u Evropi zasnovani su na
              &quot;piramida&quot; sistemu poreklom iz starog Rima, kada prvi
              put počinju da se uvode standardi u vinogradarstvu i kvalitetu
              vina radi ostvarenja veće ekonomske dobiti. Prvi sprat ovog
              sistema čine vina zaštićenog porekla (
              <em>Protected Destionation of Origin</em> -- PDO) proizvedena od
              sorti uzgajanih isključivo na definisanom području. Takodje, vino
              PDO kvaliteta mora biti proizvedeno na definisanom lokalitetu.
              Pored ovih regulacija evropske države uvode dodatne specifikacije
              proizvodnje vina, npr. određen broj i procenat sorti grožđa, tačno
              definisan prinos po hektaru, standardizovan proces uzgajanja i
              proizvodnje. Ova praksa je garancija kvaliteta vina iz tog
              područja i vina koja ispunjavaju sve ove regulative mogu da nose
              PDO etiketu. U sledeći niži sprat ovih klasifikacija sa malo
              opuštenijim brojem regulacija ulaze vina sa geografskim poreklom (
              <em>Protected Geographic Indication</em> -- PGI) koja ne moraju da
              budu 100% od sorti uzgajanih na određenom podneblju već ovaj
              procenat može da ide 85% najmanje, i ova vina takođe moraju biti
              proizvedena na tom istom podneblju. Etikete vina iz ove grupe nose
              naznaku područja gde je vino proizvedeno (
              <em>vin de pays, vino de terra</em>). Ove regulacije su još
              opuštenije za vina iz najniže grupe koju čine komercijalna stona
              vina bez geografske naznake. Ukratko, ove klasifikacije bazirane
              su na podeli: regulisana vina iz određenog regiona i na ona druga
              &quot;obična&quot; vina.
            </p>
            <p>
              Sistematski pristup proizvodnje vina od Rimljana preuzimaju
              katolička crkva i monasi srednjeg veka. &quot;Renesansa vina&quot;
              poklapa se se &quot;mračnim&quot; periodom srednjeg veka kada
              mnoge discipline prolaze kroz period stagnacije. Vinska presa,
              staklena flaša, drveni barik, već tada su uveliko u upotrebi.
              Observacije monaha-vinara o korelacijama položaja vinograda,
              zemljišta i klime sa količinom i kvalitetom prinosa počeci su
              modernih vinskih apelacija i standarda kvaliteta vina. Davno
              utvrđeni lokaliteti sa jačim predispozicijama ili &quot;Svete
              Zemlje Vina&quot; Italija, Španija, Francuska u prvom redu, dom su
              najproduktivnjim regionima vina; Bordo, Toskana, Rioja, Champagne,
              Burgundy, Piemont i sortama grozđa Cabernet Sauvignon, Chardonnay,
              Merlot, Pinot Noir, Sangiovese, Nebbiolo, Shiraz.
            </p>
            <ArticleEnd />
          </article>
        </div>
        {/* moda--slideshow.aside */}
        <div className="right-0 hidden h-full p-0 m-0 lg:!block lg:w-5/12 lg:!absolute">
          <SlideshowImages
            images={[
              "/hist/export/regioni01.jpg",
              "/hist/export/regioni02.jpg",
              "/hist/export/regioni03.jpg",
              "/hist/export/regioni04.jpg",
              "/hist/export/regioni05.jpg",
              "/hist/export/regioni06.jpg",
              "/hist/export/regioni07.jpg",
              "/hist/export/regioni08.jpg",
              "/hist/export/regioni09.jpg",
              "/hist/export/regioni10.jpg",
              "/hist/export/regioni11.jpg",
              "/hist/export/regioni12.jpg",
            ]}
          />
        </div>
      </LinkCell>
      <LinkCell title="tehnologija" id="cell-tech" classes="rounded-tr-2xl">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-5 relative">
            <Image layout="fill" src={imgPlaceholder} alt="" />
          </div>
          <div className="col-span-7 p-6 overflow-y-auto scrollbar-thin">
            <article className="prose">
              <h2>🚧 winemaking</h2>
              <p>
                @TODO; Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam ratione dolor nihil consequatur eos labore incidunt
                quisquam odio, ducimus, iusto eum omnis expedita assumenda
                facilis illo illum voluptatum culpa dolorem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                ratione dolor nihil consequatur eos labore incidunt quisquam
                odio, ducimus, iusto eum omnis expedita assumenda facilis illo
                illum voluptatum culpa dolorem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                ratione dolor nihil consequatur eos labore incidunt quisquam
                odio, ducimus, iusto eum omnis expedita assumenda facilis illo
                illum voluptatum culpa dolorem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                ratione dolor nihil consequatur eos labore incidunt quisquam
                odio, ducimus, iusto eum omnis expedita assumenda facilis illo
                illum voluptatum culpa dolorem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                ratione dolor nihil consequatur eos labore incidunt quisquam
                odio, ducimus, iusto eum omnis expedita assumenda facilis illo
                illum voluptatum culpa dolorem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                ratione dolor nihil consequatur eos labore incidunt quisquam
                odio, ducimus, iusto eum omnis expedita assumenda facilis illo
                illum voluptatum culpa dolorem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                ratione dolor nihil consequatur eos labore incidunt quisquam
                odio, ducimus, iusto eum omnis expedita assumenda facilis illo
                illum voluptatum culpa dolorem?
              </p>
            </article>
          </div>
        </div>
      </LinkCell>
      <LinkCell title="senzorika" id="cell-tasting" classes="rounded-bl-2xl">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-7 p-6 overflow-y-auto scrollbar-thin">
            <article className="prose">
              <h2>🚧 wine tasting</h2>
              <p>
                @TODO; Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi debitis illum tempore, doloribus quidem dolor quis
                corporis saepe! Dignissimos velit repellat accusamus facilis
                accusantium, adipisci ullam obcaecati recusandae! Quaerat,
                totam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi debitis illum tempore, doloribus quidem dolor quis
                corporis saepe! Dignissimos velit repellat accusamus facilis
                accusantium, adipisci ullam obcaecati recusandae! Quaerat,
                totam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi debitis illum tempore, doloribus quidem dolor quis
                corporis saepe! Dignissimos velit repellat accusamus facilis
                accusantium, adipisci ullam obcaecati recusandae! Quaerat,
                totam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi debitis illum tempore, doloribus quidem dolor quis
                corporis saepe! Dignissimos velit repellat accusamus facilis
                accusantium, adipisci ullam obcaecati recusandae! Quaerat,
                totam!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi debitis illum tempore, doloribus quidem dolor quis
                corporis saepe! Dignissimos velit repellat accusamus facilis
                accusantium, adipisci ullam obcaecati recusandae! Quaerat,
                totam!
              </p>
            </article>
          </div>
          <div className="col-span-5 relative">
            <Image layout="fill" src={imgPlaceholder} alt="" />
          </div>
        </div>
      </LinkCell>
      <LinkCell title="srbija" id="cell-serbia" classes="rounded-br-2xl">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-5 relative">
            <Image layout="fill" src={imgPlaceholder} alt="" />
          </div>
          <div className="col-span-7 p-6">
            <article className="prose">
              <h2>🚧 srbija</h2>
              <p>
                @TODO; Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maxime necessitatibus vel animi, quos blanditiis unde inventore
                qui ratione placeat ipsam quam itaque corrupti, odio expedita,
                voluptatum dicta velit. Suscipit ipsam rerum alias blanditiis
                quod est quos facere, eos nam praesentium voluptas cumque qui
                fugit laborum dolores impedit voluptates laboriosam repellendus
                perspiciatis asperiores numquam deserunt sit.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
                necessitatibus vel animi, quos blanditiis unde inventore qui
                ratione placeat ipsam quam itaque corrupti, odio expedita,
                voluptatum dicta velit. Suscipit ipsam rerum alias blanditiis
                quod est quos facere, eos nam praesentium voluptas cumque qui
                fugit laborum dolores impedit voluptates laboriosam repellendus
                perspiciatis asperiores numquam deserunt sit.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
                necessitatibus vel animi, quos blanditiis unde inventore qui
                ratione placeat ipsam quam itaque corrupti, odio expedita,
                voluptatum dicta velit. Suscipit ipsam rerum alias blanditiis
                quod est quos facere, eos nam praesentium voluptas cumque qui
                fugit laborum dolores impedit voluptates laboriosam repellendus
                perspiciatis asperiores numquam deserunt sit.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
                necessitatibus vel animi, quos blanditiis unde inventore qui
                ratione placeat ipsam quam itaque corrupti, odio expedita,
                voluptatum dicta velit. Suscipit ipsam rerum alias blanditiis
                quod est quos facere, eos nam praesentium voluptas cumque qui
                fugit laborum dolores impedit voluptates laboriosam repellendus
                perspiciatis asperiores numquam deserunt sit.
              </p>
            </article>
          </div>
        </div>
      </LinkCell>
    </div>
  );
};

export default SlideAboutWine;
