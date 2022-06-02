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
import {
  useGlobals,
  INPUT_WINE_REVIEW,
  WINE_REVIEW_IMAGE_DATAURL,
  WINE_REVIEW_IMAGE_FILE,
  WINE_REVIEW_ONSAVE,
  WR_RECORD,
  WR_DBSAVE,
  WR_SAVED,
  WINE_REVIEW_IMAGE_SHOW,
} from "../../src/hooks/use-globals";
import {
  useFlags,
  IS_REQUIRED_WR_INPUT_WINE,
  IS_PROCESSING_WR_SAVE,
} from "../../src/hooks/use-flags-global";
import InputWineReviewRangeSlider from "../InputWineReviewRangeSlider/InputWineReviewRangeSlider";
import RatingFiveStars from "../RatingFiveStars/RatingFiveStars";
import PageWineReviewImageThumb from "../PageWineReviewImageThumb/PageWineReviewImageThumb";
import ChooseImage from "../ChooseImage/ChooseImage";
import PageWineReviewNoImageThumb from "../PageWineReviewNoImageThumb/PageWineReviewNoImageThumb";
import useIsMounted from "../../src/hooks/use-is-mounted";
import { useAuth } from "../../app/store";
import NotificationDangerNotAuthenticated from "../NotificationDangerNotAuthenticated/NotificationDangerNotAuthenticated";
import useStateSwitch from "../../src/hooks/use-state-switch";
import Effect from "../Effect";
import { WR_InitRecord } from "../../src/util";
import cli from "../../src/feathers";
import useHandleImageDataUrl from "../../src/hooks/use-handle-image-data-url";
import { UserNotificationPostSaved } from "../UserNotification";
import useChatNotify from "../../src/hooks/use-chat-notify";
import useFirebaseStorageUpload from "../../src/hooks/use-firebase-storage-upload";
//
//
const IDWINERATING = "wineRating";
////
////
const PageWineReview = () => {
  const isMounted = useIsMounted();
  const { user } = useAuth();
  const globals = useGlobals();
  const { flags, toggle: toggleFlags } = useFlags();
  //
  // toggles user notification
  // if not logged in
  const {
    isOn: isActiveUserNotification,
    toggle: toggleIsActiveUserNotification,
  } = useStateSwitch();
  const { isOn: isMissingWRName, toggle: toggleIsMissingWRName } =
    useStateSwitch();
  const { isOn: isMissingRating, toggle: toggleIsMissingRating } =
    useStateSwitch();
  //
  // set it `false` initialy
  // activate when user interacts with input
  // update to `true` @@onSave-tgl when data gets sent
  const isRequiredWRinputWine = flags[IS_REQUIRED_WR_INPUT_WINE];
  // all input values {[name: string]: any}
  const wineReview = globals(INPUT_WINE_REVIEW);
  //
  const wineReviewOnSave = globals(WINE_REVIEW_ONSAVE);
  //
  // @@debug
  // const [debugWRRecord, setDebugWRRecord] = useState();
  const isProcessingWRSave = () => toggleFlags.on(IS_PROCESSING_WR_SAVE);
  const isProcessingWRSaveOff = () => toggleFlags.off(IS_PROCESSING_WR_SAVE);
  const WRimageFile = globals(WINE_REVIEW_IMAGE_FILE);
  const { upload, status: __ } = useFirebaseStorageUpload();
  useEffect(() => {
    if (isMounted && wineReviewOnSave) {
      // ..same as page-article
      // 0. user check { .author }?
      if (!user) return toggleIsActiveUserNotification.on();
      // 1. validate required fields { .wine .wineRating .author }
      if (0 === String(wineReview?.wine || "").trim().length) {
        toggleIsMissingWRName.on();
        // @@onSave-tgl
        return toggleFlags.on(IS_REQUIRED_WR_INPUT_WINE);
      }
      if (null == wineReview[IDWINERATING]) {
        toggleIsMissingRating.on();
        return;
      }
      //
      // ..all good here
      // can upload/store user input
      globals.set(
        WR_RECORD,
        WR_InitRecord(
          {
            wine: wineReview.wine,
            author: user.uid,
            wineRating: wineReview[IDWINERATING],
          },
          wineReview
        )
      );
      //
      //  ..db.record ready
      //
      // @@debug
      // setDebugWRRecord(Date.now());
      //
      // // trigger spinner
      isProcessingWRSave();

      // //
      // // 2. upload/validate image
      if (!WRimageFile?.file) {
        // if no image provided..
        // signal db.save start; exit, skips upload..
        globals.set(WR_DBSAVE, Date.now());
        return;
      }
      //
      // imageFile{ file: File, target: Node }
      upload(WRimageFile.file, `/wr/${Date.now()}.${WRimageFile.file.name}`);
      //
    }
  }, [wineReviewOnSave]);
  //
  //
  // handle image upload-status change
  useEffect(() => {
    if (!__.error && __.downloadURL) {
      //
      globals.set(WR_RECORD, {
        ...globals(WR_RECORD),
        image: __.downloadURL,
      });
      //
      // trigger db.save
      globals.set(WR_DBSAVE, Date.now());
    }
  }, [__.error, __.downloadURL]);

  //
  //
  const wrDBSave = globals(WR_DBSAVE);
  const nullCachedData = () => globals.set(WR_RECORD, null);
  const wrImageCached = useHandleImageDataUrl({
    GLOBAL_FILE: WINE_REVIEW_IMAGE_FILE,
    GLOBAL_DATAURL: WINE_REVIEW_IMAGE_DATAURL,
    GLOBAL_SHOW: WINE_REVIEW_IMAGE_SHOW,
  });
  const {
    isOn: isActiveNotificationWRSaved,
    toggle: toggleIsActiveNotificationWRSaved,
  } = useStateSwitch();
  const chatPublish = useChatNotify();
  //
  useEffect(() => {
    //  WR_RECORD
    let data;
    if (wrDBSave) {
      data = globals(WR_RECORD);
      if (data) {
        cli
          .service("winereview")
          .create(data)
          .then((payload) => {
            // record saved; clear cached data
            // prevents re-saves on page @re-mounts
            nullCachedData();
            //
            // cache saved article record; append
            globals.set(WR_SAVED, [...(globals(WR_SAVED) || []), payload]);
            //
            // nullArticleInputs();
            // DeleteImage();
            wrImageCached.rm();
            //
            // notify user article saved..
            // toggleActiveDrawerBox.on();
            toggleIsActiveNotificationWRSaved.on();
            //
            // notify chat @new wine-review
            // chatPublishArticlePosted(payload);
            chatPublish({
              author: "🤖",
              text: `Nova ocena vina. @${user?.displayName || "👤"}`,
            });
            //
          })
          .finally(isProcessingWRSaveOff);
      } else {
        isProcessingWRSaveOff();
      }
    }
    //
  }, [wrDBSave]);
  //
  const onChange_ = (payload) => {
    globals.set(INPUT_WINE_REVIEW, {
      ...wineReview,
      [payload.name]: payload.value,
    });
  };
  const imageDataWineReview = globals(WINE_REVIEW_IMAGE_DATAURL);
  //
  // @@debug
  // useEffect(() => {
  //   if (wineReview) console.log(wineReview);
  // }, [wineReview]);
  // useEffect(() => {
  //   console.log(globals(WR_RECORD));
  // }, [debugWRRecord]);
  //
  return (
    <>
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
            <Effect
              isActive={isMissingWRName}
              onEnd={toggleIsMissingWRName.off}
            >
              <PageWineReviewInput
                onChange={onChange_}
                isRequired={isRequiredWRinputWine}
                name="wine"
                value={wineReview.wine}
                placeholder="Naziv vina (etiketa...)"
              />
            </Effect>
            <div className="flex flex-row gap-x-2">
              <PageWineReviewInput
                onChange={onChange_}
                name="producer"
                value={wineReview.producer}
                placeholder="Proizvođač/Poreklo"
                classes="grow"
              />
              <PageWineReviewInput
                onChange={onChange_}
                name="year"
                value={wineReview.year}
                type="number"
                placeholder="Godina berbe"
                classes="w-32 grow-0 shrink"
              />
            </div>

            <div className="flex flex-row gap-x-2">
              <PageWineReviewInput
                onChange={onChange_}
                name="grape"
                value={wineReview.grape}
                placeholder="Sorta grožđa"
                classes="grow"
              />
              {/* price in RSD */}
              <PageWineReviewInput
                onChange={onChange_}
                name="price"
                value={wineReview.price}
                type="number"
                placeholder="Cena (RSD)"
                classes="w-32 grow-0 shrink"
              />
            </div>
          </div>
          {/*  */}
          {/* upload.image --right */}
          <div className="relative col-span-3 ***bg-slate-50 rounded-2xl overflow-hidden">
            {imageDataWineReview ? (
              <PageWineReviewImageThumb
                classes="opacity-80 hover:opacity-90 active:opacity-1000 cursor-pointer"
                imageDataUrl={imageDataWineReview}
              />
            ) : (
              <ChooseImage
                id="pageWineReview.hqnudedvazk"
                GLOBAL_DATAURL={WINE_REVIEW_IMAGE_DATAURL}
                GLOBAL_FILE={WINE_REVIEW_IMAGE_FILE}
                className="flex justify-center items-center"
              >
                <PageWineReviewNoImageThumb />
              </ChooseImage>
            )}
          </div>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/* izgled/miris/ukus */}
        <div
          className="grid grid-cols-3 ***bg-green-600 p-1 **grid-rows-2 mt-8"
          style={{
            gridTemplateRows: "1fr minmax(0, 100%)",
          }}
        >
          {/*  */}
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
          {/*  */}
          {/* col.2 */}
          <div className={`${modcss.bgArome} ***bg-blue-50`}>
            <InputWineAroma className="space-y-2" />
          </div>
          {/*  */}
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
              <InputWineReviewRangeSlider
                title="Nivo alkohola"
                name="levelAlc"
              />
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
          {/*  */}
          {/* cell.4 */}
          <div className="prose text-center pt-4 col-span-2 ***bg-yellow-50 flex justify-center items-center">
            {/*  */}
            <Effect
              isActive={isMissingRating}
              onEnd={toggleIsMissingRating.off}
            >
              <RatingFiveStars
                size={52}
                id={IDWINERATING}
                onChange={(rating) =>
                  onChange_({ name: IDWINERATING, value: rating })
                }
                classInactive="text-stone-300"
              />
              <p className="text-stone-800 opacity-60 italic">
                Moja konačna ocena vina
              </p>
            </Effect>
          </div>
        </div>
        {/*  */}
      </form>
      {/*   */}
      {/* user notification --not-signed-in */}
      <NotificationDangerNotAuthenticated
        isActive={isActiveUserNotification}
        onClose={toggleIsActiveUserNotification.off}
      >
        👤 LOGIN to use this feature
      </NotificationDangerNotAuthenticated>
      {/*  */}
      {/*  */}
      <UserNotificationPostSaved
        isActive={isActiveNotificationWRSaved}
        onClose={toggleIsActiveNotificationWRSaved.off}
        history={globals(WR_SAVED)}
      >
        <p>You successfully saved your wine-review. 🍸😎</p>
      </UserNotificationPostSaved>
    </>
  );
};
////
////
export default PageWineReview;
//
