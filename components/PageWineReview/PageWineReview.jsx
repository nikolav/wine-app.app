import React, { useEffect } from "react";
import modcss from "./PageWineReview.module.css";
import { prevent } from "../../src/util";
import PageWineReviewInput from "./PageWineReviewInput";
import {
  InputWineColor,
  InputWineClearOrHazy,
  InputWineFizzy,
  InputWineAroma,
} from "./inputs";
import { useGlobals, INPUT_WINE_REVIEW } from "../../src/hooks/use-globals";
import InputWineReviewRangeSlider from "../InputWineReviewRangeSlider/InputWineReviewRangeSlider";
import RatingFiveStars from "../RatingFiveStars/RatingFiveStars";
// import {BiImage} from "../icons";
////
////
const PageWineReview = () => {
  const idWineRating = "wineRating";
  //
  const globals = useGlobals();
  const wineReview = globals(INPUT_WINE_REVIEW);
  //
  const onChange_ = (payload) => {
    globals.set(INPUT_WINE_REVIEW, {
      ...wineReview,
      [payload.name]: payload.value,
    });
  };
  //
  useEffect(() => {
    if (wineReview) console.log(wineReview);
  }, [wineReview]);
  //
  return (
    <form
      onSubmit={prevent()}
      className={`px-2 **prose ${modcss.bgWineReview} ***bg-yellow-200 h-full overflow-y-auto scrollbar-thin`}
      noValidate
    >
      {/*  */}
      {/* inputs + image */}
      <div className="grid grid-cols-12 px-3">
        {/*  */}
        {/* inputs --left */}
        <div className="space-y-6 col-span-9 pr-2 **bg-yellow-50">
          <PageWineReviewInput
            onChange={onChange_}
            // isRequired={true}
            name="wine"
            placeholder="Naziv vina (etiketa...)"
          />
          <div className="flex flex-row gap-x-2">
            <PageWineReviewInput
              onChange={onChange_}
              name="producer"
              placeholder="Proizvođač/Poreklo"
              classes="grow"
            />
            <PageWineReviewInput
              onChange={onChange_}
              name="year"
              type="number"
              placeholder="Godina berbe"
              classes="w-32 grow-0 shrink"
            />
          </div>

          <div className="flex flex-row gap-x-2">
            <PageWineReviewInput
              onChange={onChange_}
              name="grape"
              placeholder="Sorta grožđa"
              classes="grow"
            />
            <PageWineReviewInput
              onChange={onChange_}
              name="price"
              type="number"
              placeholder="Cena (RSD)"
              classes="w-32 grow-0 shrink"
            />
          </div>
        </div>
        {/*  */}
        {/* upload.image --right */}
        <div className="col-span-3 bg-slate-50">
          @todo.image
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/* izgled/miris/ukus */}
      <div
        className="grid grid-cols-3 ***bg-green-600 **gap-1 p-1 **grid-rows-2 mt-8"
        style={{
          gridTemplateRows: "1fr minmax(0, 100%)",
        }}
      >
        {/*  */}
        {/* col.1 */}
        <div className={`${modcss.bgIzgled} ***bg-red-100`}>
          <div className="space-y-6">
            <InputWineColor />
            <InputWineClearOrHazy />
            <InputWineFizzy />
          </div>
        </div>
        {/*  */}
        {/* col.2 */}
        <div className={`${modcss.bgArome
        } ***bg-blue-50`}>
          <InputWineAroma className="space-y-2" />
        </div>
        {/*  */}
        {/* col.3 */}
        <div className={`${modcss.bgUkus} row-span-2 ***bg-slate-50`}>
          <div className="space-y-5 px-4">
            <InputWineReviewRangeSlider
              title="Stil"
              name="levelSugar"
              max="4"
              stopValues={{
                1: "Suvo",
                2: "Polusuvo",
                3: "Poluslatko",
                4: "Slatko",
              }}
            />
            <InputWineReviewRangeSlider
              title="Nivo kiselina"
              name="levelAcid"
            />
            <InputWineReviewRangeSlider title="Nivo alkohola" name="levelAlc" />
            <InputWineReviewRangeSlider
              title="Nivo tanina"
              name="levelTannin"
            />
            <InputWineReviewRangeSlider
              stopValues={{
                1: "Kratka",
                2: "Srednja",
                3: "Duga",
              }}
              title="Završnica"
              name="levelFinish"
            />
          </div>
        </div>
        {/*  */}
        {/* cell.4 */}
        <div className="prose text-center pt-4 col-span-2 ***bg-yellow-50 flex justify-center items-center">
          {/*  */}
          <div>
            <RatingFiveStars
              size={52}
              id={idWineRating}
              onChange={(rating) =>
                onChange_({ name: idWineRating, value: rating })
              }
              classInactive="text-stone-300"
            />
            <p className="opacity-75 italic">Moja konačna ocena</p>
          </div>
        </div>
      </div>
      {/*  */}
    </form>
  );
};
////
////
export default PageWineReview;

//
//
//

function PageWineReviewRating() {
  return (
    <div>
      <hr />
      @todo.wine-rating
      <hr />
    </div>
  );
}
