import React, { useEffect, useState } from "react";
import { dbRealtime as db } from "../../app/firebase";
import { onValue, set, ref, push, remove } from "firebase/database";
import useIsMounted from "../../src/hooks/use-is-mounted";
import {
  prevent,
  sortByTimestampDesc,
  paste,
  escapeHTML,
  dateFormated,
} from "../../src/util";
import useStateSwitch from "../../src/hooks/use-state-switch";
import Panel from "../Panel";
import { RiCloseCircleFill, MdDeleteOutline } from "../icons";
import useInputSynced from "../../src/hooks/use-input-synced.js";
import { useAuth } from "../../app/store";
//
export const localId = (id) => `hjubqgepily.${id}`;
export const CREATED_AT = "_@";
//@@
export const useComments = (entityId) => {
  //
  const dbPath = `comments/${entityId}`;
  const itemRefComments = ref(db, dbPath);
  //
  const [commentsDB, setCommentsDB] = useState(null);
  //
  const comments = paste(() => commentsDB, {
    // { uid: ID, user: string, comment: string }
    add: (comment = {}) => {
      const refNewPost = push(itemRefComments);
      set(refNewPost, {
        key: refNewPost.key,
        [CREATED_AT]: Date.now(),
        ...comment,
      });
    },
    //
    rm: (key) => remove(ref(db, `${dbPath}/${key}`)),
    //
    ls: () =>
      Object.keys(commentsDB ?? {})
        .map((key) => commentsDB[key])
        .sort(sortByTimestampDesc(CREATED_AT)),
    //
    len: () => Object.keys(commentsDB ?? {}).length,
  });
  //
  useEffect(
    () =>
      onValue(itemRefComments, (snapshot) =>
        setCommentsDB((current) => snapshot.val() ?? current)
      ),
    []
  );
  //
  return comments;
  //
};
//
function WithOptionalRef({ setRefNode = null, children, ...rest }) {
  return setRefNode ? (
    <span ref={setRefNode} {...rest}>
      {children}
    </span>
  ) : (
    <span {...rest}>{children}</span>
  );
}
//@@
export const Comments = ({
  id,
  refs = null,
  // size = "sm",
  className = "",
  // ...rest
}) => {
  // refs={{ refElement, setRefElement }}
  const comments = useComments(id);
  const [refNode, setRefNode] = useState(null);
  const { isOn, toggle } = useStateSwitch();
  const { user } = useAuth();
  //
  const { sync, inputs, setInput } = useInputSynced({ comment: "" });
  const onSubmitChat = () => {
    if (0 < inputs.comment.trim().length) {
      // { uid: ID, user: string, comment: string }
      comments.add({
        uid: user?.uid ?? -1,
        user: user?.displayName || null,
        comment: inputs.comment,
      });
      setInput({ comment: "" });
    }
  };
  //
  return (
    <>
      <WithOptionalRef
        setRefNode={null != refs ? null : setRefNode}
        onClick={toggle}
        className={`!inline-block cursor-pointer ${className}`}
      >
        <strong className="***text-xl">
          <span className="mr-2 inline-block">💬</span>
        </strong>
        <i style={{ fontSize: "72%" }}>{comments.len()}</i>
      </WithOptionalRef>
      <Panel.Appear
        effect="puff"
        refElement={null != refs ? refs.refElement : refNode}
        isActive={isOn}
        placement="bottom"
        offset={[0, 2]}
        className="border-2 border-slate-900 h-[320px] w-[456px] !max-w-full  bg-gradient-to-b to-slate-200 from-slate-200/80 overflow-hidden rounded-xl shadow-xl backdrop-blur-sm"
      >
        <section className="space-y-2 text-sm p-2 pt-4 !pb-32 w-full h-full !overflow-y-auto scrollbar-thin">
          {comments.ls().map((comment) => (
            <ChatComment
              user={user}
              key={comment.key}
              comment={comment}
              comments={comments}
            />
          ))}
        </section>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-slate-900/90 to-black h-12">
          <form
            className="h-full flex flex-row items-center justify-between"
            onSubmit={prevent(onSubmitChat)}
            noValidate
          >
            <input
              onChange={sync}
              value={inputs.comment}
              name="comment"
              type="text"
              placeholder="komentari..."
              id="comment"
              autoFocus
              autoComplete="off"
              className="pl-2 placeholder:text-white/50 grow input-underline text-white/80 !border-white/80 mx-4"
            />
            <button className="bg-slate-700 font-bold hover:!bg-slate-700/80 hover:text-white text-white/80 uppercase w-24 h-full">
              ok
            </button>
          </form>
        </div>
        <RiCloseCircleFill
          onClick={toggle.off}
          className="opacity-40 hover:opacity-80 hover:scale-110 cursor-pointer absolute w-8 h-8 text-slate-900 top-1 right-2"
        />
      </Panel.Appear>
    </>
  );
};
//@@
export const useLike = (id) => {
  //
  const LIKECACHE = localId(id);
  const isMounted = useIsMounted();
  //
  const [likeCount, setLikeCount] = useState(0);
  const itemRefLike = ref(db, `like/${id}`);

  useEffect(() => {
    return onValue(itemRefLike, (snapshot) =>
      setLikeCount((old_) => snapshot.val() ?? old_)
    );
  }, []);

  return { like, likeCount };

  function like() {
    if (!isMounted) return;

    if (null != localStorage.getItem(LIKECACHE)) return unlike_();

    localStorage.setItem(LIKECACHE, 1);
    set(itemRefLike, likeCount + 1);
  }

  function unlike_() {
    localStorage.removeItem(LIKECACHE);
    set(itemRefLike, likeCount - 1);
  }
};
//@@
export const Like = ({ id, size = "sm", className = "", ...rest }) => {
  const isMounted = useIsMounted();
  const isLiked = isMounted ? null != localStorage.getItem(localId(id)) : null;
  const { like, likeCount } = useLike(id);

  return (
    <em
      className={`!inline-block cursor-pointer ${className}`}
      onClick={like}
      {...rest}
    >
      <strong className="***text-xl">
        <span
          className={`mr-2 inline-block ${
            isLiked ? "opacity-100" : "opacity-40 hover:opacity-60"
          }`}
        >
          👍🏻
        </span>
      </strong>
      <i style={{ fontSize: "72%" }} className="***pt-1 ***ml-1">
        {likeCount ?? "."}
      </i>
    </em>
  );
};

export const CommentsLike = ({ id, size = "sm", className = "", ...rest }) => {
  const [refElement, setRefElement] = useState(null);
  //
  return (
    <span
      ref={setRefElement}
      className={`border border-slate-200/30 rounded-full !w-fit bg-gradient-to-b from-slate-100/30 to-slate-100 flex flow-row justify-center items-center ${className}`}
    >
      <Comments
        refs={{ refElement }}
        id={id}
        className="hover:bg-slate-200/30 p-2 rounded-l-full !pl-4"
        size
      />
      <Like
        id={id}
        className="hover:bg-slate-200/30 p-2 rounded-r-full !pr-4"
        size
      />
    </span>
  );
};

//
function ChatComment({
  comment,
  className = "",
  user = null,
  comments,
  ...rest
}) {
  // comment: { uid: ID, user: string, comment: string }
  const ownsComment = null != user && user.uid === comment.uid;
  return (
    <div
      className={`shadow rounded-xl p-2 flex flex-row gap-6 justify-between items-start ${className} ${
        ownsComment
          ? "bg-slate-300/60 hover:bg-slate-300/70"
          : "bg-slate-300/30 hover:bg-slate-300/40"
      }`}
      {...rest}
    >
      <div className="w-20 text-center">
        <div className="opacity-70 truncate">{comment?.user || "👤"}</div>
        <small className="!text-xs italic opacity-30">
          {dateFormated(comment[CREATED_AT])}
        </small>
      </div>
      <p className="!grow">{escapeHTML(comment.comment)}</p>
      {ownsComment ? (
        <MdDeleteOutline
          onClick={() => comments.rm(comment.key)}
          className="text-slate-800 self-center h-5 w-5 opacity-20 hover:opacity-80 hover:scale-110 cursor-pointer"
        />
      ) : null}
    </div>
  );
}
