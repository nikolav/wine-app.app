import React from "react";
import modcss from "./PageWineReview.module.css";
import { prevent } from "../../src/util";
// import useStateSwitch from "../../src/hooks/use-state-switch";
import PageWineReviewInput from "./PageWineReviewInput";
import InputWineColor from "./InputWineColor";
////
////
const PageWineReview = () => {
  const onSubmit = () => {};
  //
  return (
    <form
      onSubmit={prevent(onSubmit)}
      className={`m-0 p-0 px-4 **prose ${modcss.bgWineReview} **bg-yellow-200 h-full overflow-y-auto scrollbar-thin`}
      noValidate
    >
      {/*  */}
      {/* inputs + image */}
      <div className="grid grid-cols-12">
        {/*  */}
        {/* inputs --left */}
        <div className="space-y-6 col-span-9 pr-2 **bg-yellow-50">
          <PageWineReviewInput
            isRequired={true}
            name="wine"
            placeholder="Naziv vina (etiketa...)"
          />
          <div className="flex flex-row gap-x-2">
            <PageWineReviewInput
              name="producer"
              placeholder="Proizvođač/Poreklo"
              classes="grow"
            />
            <PageWineReviewInput
              name="year"
              type="number"
              placeholder="Godina berbe"
              classes="w-32 grow-0 shrink"
            />
          </div>

          <div className="flex flex-row gap-x-2">
            <PageWineReviewInput
              name="grape"
              placeholder="Sorta grožđa"
              classes="grow"
            />
            <PageWineReviewInput
              name="price"
              type="number"
              placeholder="Cena (RSD)"
              classes="w-32 grow-0 shrink"
            />
          </div>
        </div>
        {/*  */}
        {/* upload.image --right */}
        <div className="col-span-3 bg-slate-50">-wine.image-</div>
      </div>
      {/*  */}
      {/* @todo; <PageWineReviewRating> here  */}
      <PageWineReviewRating />
      {/*  */}
      {/* izgled/miris/ukus */}
      <div className="md:grid md:grid-cols-12 **bg-red-50 gap-x-2">
        <div className="md:col-span-4">
          izgled
          <hr />
          <div>
            <InputWineColor />
          </div>
        </div>
        <div className="md:col-span-4">
          miris
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          ratione animi delectus?
        </div>
        <div className="md:col-span-4">
          ukus
          <hr />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
          tempore deserunt dolores.
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/* 
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, iste dolore earum ab libero dignissimos distinctio cupiditate nobis numquam quis consectetur praesentium!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, iste dolore earum ab libero dignissimos distinctio cupiditate nobis numquam quis consectetur praesentium!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, iste dolore earum ab libero dignissimos distinctio cupiditate nobis numquam quis consectetur praesentium!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, iste dolore earum ab libero dignissimos distinctio cupiditate nobis numquam quis consectetur praesentium!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, iste dolore earum ab libero dignissimos distinctio cupiditate nobis numquam quis consectetur praesentium!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, iste dolore earum ab libero dignissimos distinctio cupiditate nobis numquam quis consectetur praesentium!</div>
       */}
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
  return <div>@todo.wine-rating</div>;
}
