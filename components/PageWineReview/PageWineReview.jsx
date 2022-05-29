import React from "react";
import modcss from "./PageWineReview.module.css";
////
////
const PageWineReview = () => {
  return (
    <div className={`**prose ${modcss.bgWineReview} **bg-yellow-200`}>
      <h2>wine-reviews; @todo</h2>
      <article>
      </article>
      <hr />

    </div>
  );
};

export default PageWineReview;

/*

  @Schema
      //
      // naziv vina; sa etikete..
      wine: {
        type: String,
        index: true,
        required: true,
      },
      //
      // @firebase user.uid
      author: {
        type: String,
        required: true,
      },
      //
      // arome..
      aroma: String,
      //
      // crveno | rose | belo
      color: String,
      //
      // opis vina
      desciption: String,
      //
      // sorte grozdja
      grape: Array,
      //
      // fotografija
      image: String,
      //
      // poreklo
      origin: String,
      //
      // nivo kiseline, alc., tanini
      percentAcid: Number,
      percentAlcohol: Number,
      percentTannin: Number,
      //
      // cena i valuta
      price: Number,
      priceCurrency: String,
      //
      // prizvodjac, vinarija
      producer: String,
      //
      // 1..5
      rating: {
        type: Number,
        required: true,
      },
      //
      // suvo | polusuvo | poluslatko | slatko
      style: String,
      //
      // penusavo | desertno | fortifidovano | aromatizovano
      type: {
        type: String,
      },
      //
      // godina berbe
      year: Number,

      +timestamps

*/
