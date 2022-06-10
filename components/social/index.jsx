import React from "react";
import { useEffect, useState } from "react";
import { dbRealtime as db } from "../../app/firebase";
import { onValue, set, ref, push, remove } from "firebase/database";
import useIsMounted from "../../src/hooks/use-is-mounted";
import { sortByTimestampDesc, paste } from "../../src/util";
import useStateSwitch from "../../src/hooks/use-state-switch";
import Panel from "../Panel";

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
    //
    add: (comment) => {
      const refNewPost = push(itemRefComments);
      set(refNewPost, {
        key: refNewPost.key,
        [CREATED_AT]: Date.now(),
        comment,
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
//@@
export const Comments = ({
  id,
  refs = null,
  size = "sm",
  className = "",
  ...rest
}) => {
  // refs={{ refElement, setRefElement }}
  const comments = useComments(id);
  const [refNode, setRefNode] = useState(null);
  const { isOn, toggle } = useStateSwitch();
  //
  return (
    <>
      {null != refs ? (
        <span
          onClick={toggle}
          className={`!inline-block cursor-pointer ${className}`}
          {...rest}
        >
          <strong className="***text-xl">
            <span className="mr-2 inline-block">💬</span>
          </strong>
          <i style={{ fontSize: "72%" }}>{comments.len()}</i>
        </span>
      ) : (
        <span
          ref={setRefNode}
          onClick={toggle}
          className={`!inline-block cursor-pointer ${className}`}
          {...rest}
        >
          <strong className="***text-xl">
            <span className="mr-2 inline-block">💬</span>
          </strong>
          <i style={{ fontSize: "72%" }}>{comments.len()}</i>
        </span>
      )}
      <Panel.Appear
        effect="puff"
        refElement={null != refs ? refs.refElement : refNode}
        isActive={isOn}
        placement="bottom"
        offset={[0, 1]}
        className="border border-slate-100 w-[382px] h-[256px] bg-slate-100/90 overflow-hidden rounded-xl shadow backdrop-blur-sm"
      >
        <section className="w-full h-full !overflow-y-auto scrollbar-thin">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aspernatur perferendis quia!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aspernatur perferendis quia!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aspernatur perferendis quia!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aspernatur perferendis quia!
          </p>
        </section>
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
        refs={{ refElement, setRefElement }}
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
