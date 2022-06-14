import React, { useEffect, useRef } from "react";
import modcss from "./PageWineReview.module.css";
//
import { prevent, WR_InitRecord, WR_loadFieldsFromData } from "../../src/util";
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
  DASHBOARD_ENTRY_ACTIVE_POST,
  DASHBOARD_ENTRY_ACTIVE_POST_EDIT,
  STAR_RATING,
} from "../../src/hooks/use-globals";
import {
  useFlags,
  IS_REQUIRED_WR_INPUT_WINE,
  IS_PROCESSING_WR_SAVE,
} from "../../src/hooks/use-flags-global";
import useIsMounted from "../../src/hooks/use-is-mounted";
import useStateSwitch from "../../src/hooks/use-state-switch";
import useHandleImageDataUrl from "../../src/hooks/use-handle-image-data-url";
import useChatNotify from "../../src/hooks/use-chat-notify";
import { useAuth } from "../../app/store";
import useFirebaseStorageUpload from "../../src/hooks/use-firebase-storage-upload";
import cli from "../../src/feathers";
//
import {
  InputWineColor,
  InputWineClearOrHazy,
  InputWineFizzy,
  InputWineAroma,
} from "./inputs";
import InputWineReviewRangeSlider from "../InputWineReviewRangeSlider/InputWineReviewRangeSlider";
import PageWineReviewInput from "./PageWineReviewInput";
import RatingFiveStars from "../RatingFiveStars/RatingFiveStars";
import PageWineReviewImageThumb from "../PageWineReviewImageThumb/PageWineReviewImageThumb";
import ChooseImage from "../ChooseImage/ChooseImage";
import { UserNotificationPostSaved } from "../UserNotification";
import PageWineReviewNoImageThumb from "../PageWineReviewNoImageThumb/PageWineReviewNoImageThumb";
import NotificationDangerNotAuthenticated from "../NotificationDangerNotAuthenticated/NotificationDangerNotAuthenticated";
import Effect from "../Effect";
import { usePages } from "../../app/store";
import { PAGE_LOGIN, PAGE_WINE_REVIEW_EDIT } from "../../app/store/page";
import { useQueryClient } from "react-query";
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
    //
    if (isMounted && wineReviewOnSave) {
      // 0. user check { .author }?
      if (!user) return toggleIsActiveUserNotification.on();
      // 1. validate required fields { .wine .wineRating -author }
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
      // @todo; icon.disabled
      isProcessingWRSave();

      // // 2. upload/validate image
      if (!WRimageFile?.file) {
        // if no image provided..
        // signal db.save start; exit skips upload
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
  // @todo; upload errors
  useEffect(() => {
    if (!__.error && __.downloadURL) {
      //
      globals.set(WR_RECORD, {
        ...globals(WR_RECORD),
        image: __.downloadURL,
      });
      //
      // all set, trigger db.save
      globals.set(WR_DBSAVE, Date.now());
    }
  }, [__.error, __.downloadURL]);

  //
  // onChange triggers useEffect
  const wrDBSave = globals(WR_DBSAVE);
  // gc after storage
  const nullCachedData = () => globals.set(WR_RECORD, null);
  // manage selected image
  const wrImageCached = useHandleImageDataUrl({
    GLOBAL_FILE: WINE_REVIEW_IMAGE_FILE,
    GLOBAL_DATAURL: WINE_REVIEW_IMAGE_DATAURL,
    GLOBAL_SHOW: WINE_REVIEW_IMAGE_SHOW,
  });
  // trigger user notification
  const {
    isOn: isActiveNotificationWRSaved,
    toggle: toggleIsActiveNotificationWRSaved,
  } = useStateSwitch();
  // post chat notification
  const chatPublish = useChatNotify();
  //
  const qClient = useQueryClient();
  const setActivePost = (post) =>
    globals.set(DASHBOARD_ENTRY_ACTIVE_POST, post);
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
            // cache saved article record; ls.append
            // @todo; undo, history, etc.
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
            // refresh dashboard and
            // set active post to no record
            qClient.invalidateQueries("winereview");
            setActivePost(payload);
            // notify chat @created.winereview
            chatPublish({
              author: "🤖",
              text: `Nova ocena vina. @${user?.displayName || "👤"}`,
            });
            //
          })
          // @todo; enable icon.save
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
  const { setPage } = usePages();
  //
  //
  const editPostWR = useRef(globals(DASHBOARD_ENTRY_ACTIVE_POST_EDIT)?.post);
  useEffect(() => {
    if (editPostWR?.current) {
      //sync set inputs, @WR_loadFieldsFromData
      globals.set(INPUT_WINE_REVIEW, WR_loadFieldsFromData(editPostWR.current));
      //
      // sync star-ratings
      globals.set(STAR_RATING, {
        ...globals(STAR_RATING),
        [IDWINERATING]: editPostWR.current[IDWINERATING],
      });
    }

    return () => {
      //
      // clear context to unblock loading dashboard
      // DASHBOARD_ENTRY_ACTIVE_POST_EDIT is set
      // so dashbord keeps tring  to load it
      // globals.set(DASHBOARD_ENTRY_ACTIVE_POST_EDIT, null);
      globals.set(DASHBOARD_ENTRY_ACTIVE_POST_EDIT, null);
    };
  }, []);
  //
  return (
    <>
      <form
        onSubmit={prevent()}
        className={`px-2 ${modcss.bgWineReview} h-full overflow-y-auto scrollbar-thin`}
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
        👤{" "}
        <strong
          onClick={prevent(setPage.bind(null, PAGE_LOGIN))}
          className="link px-2"
        >
          PRIJAVITE SE
        </strong>{" "}
        za korišćenje ove usluge
      </NotificationDangerNotAuthenticated>
      {/*  */}
      {/*  */}
      <UserNotificationPostSaved
        isActive={isActiveNotificationWRSaved}
        onClose={toggleIsActiveNotificationWRSaved.off}
        history={globals(WR_SAVED)}
      >
        <p>Uspšno se sačuvali ocenu vina. 🍸😎</p>
      </UserNotificationPostSaved>
    </>
  );
};
////
////
export default PageWineReview;
//
