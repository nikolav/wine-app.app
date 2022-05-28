import React, { useEffect } from "react";
//
import { useSlate } from "slate-react";
import SlateEditable from "../SlateEditable/SlateEditable";
//
import useSyncInput from "../../src/hooks/use-sync-input";
import Required from "../Required/Required";
//
import { prevent } from "../../src/util";
import cli from "../../src/feathers";
import useIsMounted from "../../src/hooks/use-is-mounted";
//
import {
  useGlobals,
  ARTICLE_ONSAVE,
  ARTICLE_IMAGE_FILE,
  ARTICLE_DBSAVE,
  ARTICLE_DATA,
} from "../../src/hooks/use-globals";
//
import { useAuth } from "../../app/store";
import useFirebaseStorageUpload from "../../src/hooks/use-firebase-storage-upload";
////
////
const PageArticle = () => {
  const isMounted = useIsMounted();
  const { user } = useAuth();
  //
  const globals = useGlobals();
  const articleOnSave = globals(ARTICLE_ONSAVE);
  const articleImageFile = globals(ARTICLE_IMAGE_FILE);
  const articleDBSave = globals(ARTICLE_DBSAVE);
  const nullArticleData = () => globals.set(ARTICLE_DATA, null);
  //
  const editor = useSlate();
  //
  const [sync, input] = useSyncInput({ articleTitle: "" });
  //
  const { upload, status: __ } = useFirebaseStorageUpload();
  //
  useEffect(() => {
    //
    let title;
    //
    if (isMounted && articleOnSave) {
      //
      // 0. make sure user is logged in
      if (!user) return;
      //
      // 1. validate title input
      title = String(input.articleTitle).trim();
      if (!title) return;
      //
      globals.set(ARTICLE_DATA, {
        title,
        slug: `${title}_${Date.now()}`,
        body: JSON.stringify(editor),
        author: user.uid,
        image: null,
      });
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
      //
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
          });
      }
    }
  }, [articleDBSave]);
  //
  // reset image data on @mounted
  // prevents unecesary saves
  useEffect(() => {
    nullArticleData();
  }, []);
  //
  return (
    <div>
      <form onSubmit={prevent()} noValidate className="px-8 mb-8 mt-4">
        <div className="flex flex-row items-center mb-4">
          <Required input={input.articleTitle} />
          <input
            id="articleTitle"
            name="articleTitle"
            type="text"
            onChange={sync}
            value={input.articleTitle}
            placeholder="Naslov..."
            autoComplete="off"
            className="input-underline !pl-4"
          />
        </div>
      </form>
      <SlateEditable editor={editor} height={320} />
    </div>
  );
};

export default PageArticle;
