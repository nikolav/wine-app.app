import React, { useEffect } from "react";
import { useSlate } from "slate-react";
import { Transforms } from "slate";
import SlateEditable from "../SlateEditable/SlateEditable";
import useInputSynced from "../../src/hooks/use-input-synced";
import Required from "../Required/Required";
import { prevent } from "../../src/util";
import cli from "../../src/feathers";
import useIsMounted from "../../src/hooks/use-is-mounted";
import {
  useGlobals,
  ARTICLE_ONSAVE,
  ARTICLE_IMAGE_FILE,
  ARTICLE_DBSAVE,
  ARTICLE_DATA,
  ARTICLE_TITLE_CACHED,
  ARTICLE_SAVED,
  ARTICLE_IMAGE_DATAURL,
  ARTICLE_IMAGE_SHOW,
} from "../../src/hooks/use-globals";
import { useAuth } from "../../app/store";
import useFirebaseStorageUpload from "../../src/hooks/use-firebase-storage-upload";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
import { UserNotificationArticleSaved } from "../UserNotification";
import {
  useFlags,
  IS_PROCESSING_ARTICLE_SAVE,
} from "../../src/hooks/use-flags-global";
import modcss from "./PageArticle.module.css";
import escapeHTML from "escape-html";
import Effect from "../Effect";
import NotificationDangerNotAuthenticated from "../NotificationDangerNotAuthenticated/NotificationDangerNotAuthenticated";
import { usePages } from "../../app/store";
import { PAGE_LOGIN } from "../../app/store/page";
////
////
const PageArticle = () => {
  //
  const isMounted = useIsMounted();
  const { user } = useAuth();
  const globals = useGlobals();
  const { sync, inputs, setInput } = useInputSynced({
    articleTitle: globals(ARTICLE_TITLE_CACHED) || "",
  });
  const { isOn: isActiveDrawerBox, toggle: toggleActiveDrawerBox } =
    useStateSwitch();
  //
  const editor = useSlate();
  //
  // triggers on/off @_app.loader
  const { toggle: toggleProcessing } = useFlags();
  const isProcessingArticleSaveOn = () =>
    toggleProcessing.on(IS_PROCESSING_ARTICLE_SAVE);
  const isProcessingArticleSaveOff = () =>
    toggleProcessing.off(IS_PROCESSING_ARTICLE_SAVE);
  //
  const articleOnSave = globals(ARTICLE_ONSAVE);
  const articleImageFile = globals(ARTICLE_IMAGE_FILE);
  const articleDBSave = globals(ARTICLE_DBSAVE);
  const nullArticleData = () => globals.set(ARTICLE_DATA, null);
  //
  const deleteImage = () => {
    globals.set(ARTICLE_IMAGE_DATAURL, null);
    globals.set(ARTICLE_IMAGE_FILE, null);
    globals.set(ARTICLE_IMAGE_SHOW, null);
  };
  const nullArticleInputs = () => {
    // clear <input>
    setInput((current) => ({ ...current, articleTitle: "" }));
    globals.set(ARTICLE_TITLE_CACHED, "");
    // clear image{}
    deleteImage();
    // clear editor
    Transforms.insertText(editor, "", { at: [] });
  };
  //
  const { upload, status: __ } = useFirebaseStorageUpload();
  //
  // triggers input effect if no title provided
  const { isOn: isActiveEffect, toggle: toggleIsActiveEffect } =
    useStateSwitch();
  //
  const chatPublishArticlePosted = (payloadArticle = null) => {
    // payloadArticle{}
    //   .title .slug .body .image .author
    if (!payloadArticle) return;
    cli
      .service("main")
      .find({
        query: {
          $limit: 1,
          $select: ["value"],
          //
          name: payloadArticle.author,
        },
      })
      .then(({ data }) => {
        const author = (data && data[0]?.value) || null;
        if (author) {
          cli.service("chat").create({
            author: "🤖",
            text: `Postavljen je novi članak. @${escapeHTML(author)}`,
          });
        }
      });
  };
  //
  const { setPage } = usePages();
  const {
    isOn: isActiveNotificationDangerNotAuthenticated,
    toggle: toggleIsActiveNotificationDangerNotAuthenticated,
  } = useStateSwitch();
  //
  useEffect(() => {
    //
    let title;
    //
    if (isMounted && articleOnSave) {
      //
      // 0. make sure user is logged in
      if (!user) {
        /**
         * not logged in..
         * trigger quick login/signup here
         */
        return toggleIsActiveNotificationDangerNotAuthenticated.on();
      }
      //
      // 1. validate title input
      title = (inputs?.articleTitle || "").trim();
      if (!title) {
        toggleIsActiveEffect.on();
        return;
      }
      //
      globals.set(ARTICLE_DATA, {
        title,
        slug: `${title}_${Date.now()}`,
        body: JSON.stringify(editor),
        author: user.uid,
        image: null,
      });
      //
      // trigger spinner
      isProcessingArticleSaveOn();

      //
      // 2. upload/validate image
      if (!articleImageFile) {
        // no image to upload..
        // signal db.save start; exit, skips upload..
        globals.set(ARTICLE_DBSAVE, Date.now());
        return;
      }
      //
      upload(articleImageFile, `/etc/${Date.now()}.${articleImageFile.name}`);
    }
  }, [articleOnSave]);
  //
  // handle image upload-status change
  useEffect(() => {
    if (!__.error && __.downloadURL) {
      //
      globals.set(ARTICLE_DATA, {
        ...globals(ARTICLE_DATA),
        image: __.downloadURL,
      });
      //
      // trigger db.save
      globals.set(ARTICLE_DBSAVE, Date.now());
    }
  }, [__.error, __.downloadURL]);
  //
  // if data complete: db.save()
  useEffect(() => {
    let data;
    if (articleDBSave) {
      data = globals(ARTICLE_DATA);
      if (data) {
        cli
          .service("articles")
          .create(data)
          .then((payload) => {
            // article saved; clear cached data
            // prevents re-saves on page @re-mounts
            nullArticleData();
            //
            // cache saved article record
            globals.set(ARTICLE_SAVED, [
              ...(globals(ARTICLE_SAVED) || []),
              payload,
            ]);
            //
            nullArticleInputs();
            //
            // notify user article saved..
            toggleActiveDrawerBox.on();
            //
            // notify chat @new article
            chatPublishArticlePosted(payload);
          })
          .finally(isProcessingArticleSaveOff);
      } else {
        isProcessingArticleSaveOff();
      }
    }
  }, [articleDBSave]);
  //
  // reset image data on @mounted
  // prevents unecesary saves
  useEffect(() => {
    nullArticleData();
    setInput((current) => ({
      ...current,
      articleTitle: globals(ARTICLE_TITLE_CACHED),
    }));
  }, []);
  //
  const onChange = (evt) => {
    sync(evt);
    globals.set(ARTICLE_TITLE_CACHED, evt.target.value || "");
  };
  //
  //
  return (
    <>
      <div className={`${modcss.bgArticle} m-0 p-0 h-full`}>
        <DrawerBox
          isActive={isActiveDrawerBox}
          onClose={toggleActiveDrawerBox.off}
        >
          <UserNotificationArticleSaved saved={globals(ARTICLE_SAVED)} />
        </DrawerBox>
        {/*  */}
        <form onSubmit={prevent()} noValidate className="px-8 mt-4 mb-8">
          <Effect
            isActive={isActiveEffect}
            onEnd={toggleIsActiveEffect.off}
            className="relative flex flex-row items-center mb-4"
          >
            <Required input={inputs?.articleTitle || ""} />
            <input
              id="articleTitle"
              name="articleTitle"
              type="text"
              onChange={onChange}
              value={inputs?.articleTitle || ""}
              placeholder="Naslov..."
              autoComplete="off"
              className="input-underline !pl-4"
            />
          </Effect>
        </form>
        {/*  */}
        <SlateEditable editor={editor} height={320} />
      </div>
      {/*   */}
      {/* user notification --not-signed-in */}
      <NotificationDangerNotAuthenticated
        isActive={isActiveNotificationDangerNotAuthenticated}
        onClose={toggleIsActiveNotificationDangerNotAuthenticated.off}
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
    </>
  );
};

export default PageArticle;
