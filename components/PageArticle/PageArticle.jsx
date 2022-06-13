import React, { useEffect, useRef } from "react";
import { useSlate } from "slate-react";
import { Transforms } from "slate";
import SlateEditable from "../SlateEditable/SlateEditable";
import useInputSynced from "../../src/hooks/use-input-synced";
import Required from "../Required/Required";
import { prevent, escapeHTML } from "../../src/util";
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
  DASHBOARD_ENTRY_ACTIVE_POST,
  DASHBOARD_ENTRY_ACTIVE_POST_EDIT,
} from "../../src/hooks/use-globals";
import { useAuth, usePages, useAppData } from "../../app/store";
import useFirebaseStorageUpload from "../../src/hooks/use-firebase-storage-upload";
import DrawerBox from "../DrawerBox/DrawerBox";
import useStateSwitch from "../../src/hooks/use-state-switch";
import { UserNotificationArticleSaved } from "../UserNotification";
import {
  useFlags,
  IS_PROCESSING_ARTICLE_SAVE,
} from "../../src/hooks/use-flags-global";
import modcss from "./PageArticle.module.css";
import Effect from "../Effect";
import NotificationDangerNotAuthenticated from "../NotificationDangerNotAuthenticated/NotificationDangerNotAuthenticated";
import { PAGE_LOGIN } from "../../app/store/page";
import useChatNotify from "../../src/hooks/use-chat-notify";
import { useQueryClient } from "react-query";
import {
  useActions,
  ACTION_DEACTIVATE_ARTICLE_TOOLTIP_TRASH,
  ACTION_DEACTIVATE_IMAGE_MODALS,
} from "../../src/hooks/use-actions-global";
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
  const actions = useActions();
  //
  // triggers on/off @_app.loader
  const { toggle: toggleFlags } = useFlags();
  const isProcessingArticleSaveOn = () =>
    toggleFlags.on(IS_PROCESSING_ARTICLE_SAVE);
  const isProcessingArticleSaveOff = () =>
    toggleFlags.off(IS_PROCESSING_ARTICLE_SAVE);
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
  const clearEditor = (editor) => Transforms.insertText(editor, "", { at: [] });
  const nullArticleInputs = () => {
    // clear <input>
    setInput((current) => ({ ...current, articleTitle: "" }));
    globals.set(ARTICLE_TITLE_CACHED, "");
    //
    deleteImage();
    //
    clearEditor(editor);
  };
  //
  const { upload, status: __ } = useFirebaseStorageUpload();
  //
  // triggers input effect if no title provided
  const { isOn: isActiveEffect, toggle: toggleIsActiveEffect } =
    useStateSwitch();
  //

  const chatNotify = useChatNotify();
  const { appdata } = useAppData();
  const chatPublishArticlePosted = (payloadArticle = null) => {
    let authorName;
    //
    if (!payloadArticle) return;
    //
    authorName = appdata?.find(
      (node) => payloadArticle.author === node.name
    )?.value;
    if (authorName) {
      chatNotify({
        author: "🤖",
        text: `Postavljen je novi članak. @[${escapeHTML(authorName)}]`,
      });
    }
  };
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
      if (!articleImageFile?.file) {
        // no image to upload..
        // signal db.save start; exit, skips upload..
        globals.set(ARTICLE_DBSAVE, Date.now());
        return;
      }
      //
      upload(
        articleImageFile.file,
        `/etc/${Date.now()}.${articleImageFile.file.name}`
      );
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
  //
  const qClient = useQueryClient();
  const setActiveArticle = (post) =>
    globals.set(DASHBOARD_ENTRY_ACTIVE_POST, post);
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
            // refresh articles query
            // select new post to show in dashboard
            qClient.invalidateQueries("articles");
            setActiveArticle(payload);
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
  const setEditor = (editor, nodes = []) => {
    editor.children = nodes;
    editor.onChange();
  };
  const editPost = useRef(globals(DASHBOARD_ENTRY_ACTIVE_POST_EDIT)?.post);
  // clear article edit data from context
  // .. unstucks navigation to dashboard page
  // .. which auto maticaly opens this page if edit post data is set
  useEffect(() => {
    // @@
    globals.set(DASHBOARD_ENTRY_ACTIVE_POST_EDIT, null);
    // if editing post
    // poopulate inputs
    // {articleTitle, slateEditor, imageUrl}
    //@@
    if (editPost?.current) {
      setInput({ articleTitle: editPost.current.title });
      setEditor(editor, JSON.parse(editPost.current.body).children);
      if (editPost.current.image) {
        globals.set(ARTICLE_IMAGE_DATAURL, editPost.current.image);
        actions[ACTION_DEACTIVATE_IMAGE_MODALS]();
      }
    }

    return () => {
      clearEditor(editor);
    };
  }, []);
  //

  useEffect(() => {
    actions[ACTION_DEACTIVATE_ARTICLE_TOOLTIP_TRASH]();
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
        <SlateEditable editor={editor} />
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
