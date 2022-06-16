import React, { useState, useEffect, useCallback } from "react";
import { useArticles, useWineReview, useAppData } from "../../app/store";
import useInputSynced from "../../src/hooks/use-input-synced";
import {
  postType,
  prevent,
  debounce,
  sortByTimestampDesc,
  dateFormated,
} from "../../src/util";
import { bdIconSearch, bgPageSearch } from "./PageSearch.module.css";
import { slateSerializePlainText } from "../SlateEditable/SlateEditable";
import imgPlaceholder from "../../public/placeholder01.png";
import { useRouter } from "next/router";
import { useLike, useComments } from "../social";
//
export { bgPageSearch };
///
const PageSearch = () => {
  const { articles } = useArticles();
  const { winereview } = useWineReview();
  const { appdata } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");
  const { inputs, sync } = useInputSynced({ search: "" });
  const [postsFound, setPostsFound] = useState([]);
  const postAuthor = (post) =>
    appdata?.find((node) => post.author === node.name)?.value || "";
  //
  const setSearchQueryDebonced = useCallback(debounce(setSearchQuery, 789), []);
  const onChangeSearchQuery = (evt) => {
    sync(evt);
    setSearchQueryDebonced(evt.target.value);
  };
  const searchArticles = (payload) =>
    articles?.filter((article) => {
      // .title .body post-author
      return [
        article.title,
        slateSerializePlainText(JSON.parse(article.body).children) || "",
        postAuthor(article),
      ].some((value) => value.toLowerCase().includes(payload.toLowerCase()));
    });
  const searchWR = (payload) =>
    winereview?.filter((wr) => {
      // .wine .description .grape .color .producer post-author
      return [
        wr.wine,
        wr.description || "",
        wr.grape || "",
        wr.color || "",
        wr.producer || "",
        postAuthor(wr),
      ].some((value) => value.toLowerCase().includes(payload.toLowerCase()));
    });
  const searchPosts = (payload) =>
    setPostsFound(
      [...searchArticles(payload), ...searchWR(payload)].sort(
        sortByTimestampDesc("updatedAt")
      )
    );
  //
  useEffect(() => {
    if (3 <= searchQuery.length) {
      searchPosts(searchQuery);
    }
  }, [searchQuery]);
  ////
  ///
  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div
        style={{
          gridTemplateRows: "1fr auto",
        }}
        className="grid h-full"
      >
        <div className="overflow-y-auto ***bg-red-100 scrollbar-thin">
          <section
            className={
              searchQuery.length < 3 || 0 === postsFound.length
                ? "h-full flex items-center justify-center"
                : ""
            }
          >
            {/* {searchQuery} */}
            {0 < searchQuery.length ? (
              3 <= searchQuery.length ? (
                0 < postsFound.length ? (
                  <ul className="px-4 py-2 space-y-4 list-none">
                    {postsFound.map((post) => (
                      <PostFound
                        ID={post._id}
                        type={postType(post)}
                        post={post}
                        author={postAuthor(post)}
                        key={post._id}
                      />
                    ))}
                  </ul>
                ) : (
                  <SearchQueryNotFound Q={searchQuery} />
                )
              ) : (
                <SearchQueryEmpty />
              )
            ) : (
              <SearchQueryEmpty />
            )}
          </section>
        </div>
        <div className="p-2">
          <form noValidate onSubmit={prevent()}>
            <div className="px-8 pb-4">
              <input
                type="text"
                name="search"
                value={inputs.search}
                onChange={onChangeSearchQuery}
                className={`${bdIconSearch} pl-12 input-underline`}
                autoComplete="off"
                autoFocus
                placeholder="Pretraga..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageSearch;
//
//
function PostFound({ post, author, type, ID }) {
  const router = useRouter();
  const visitPost = () => router.push(`/${type}/${ID}`);
  const { likeCount } = useLike(`${type}--${ID}`);
  const comments = useComments(`${type}--${ID}`);
  // .image
  // .createdAt
  // .wine || .title
  return (
    <li className="flex flex-row items-center justify-between h-24 overflow-hidden shadow group rounded-xl bg-slate-50/50 hover:bg-slate-50/80">
      <img
        className="hidden md:!block object-cover object-center w-32 h-full border-r-white opacity-80 group-hover:opacity-100"
        src={post.image || imgPlaceholder.src}
        alt=""
      />
      <div className="self-start pt-3 grow">
        {" "}
        <p className="pl-6 pr-2">
          {author && (
            <em className="block mb-2 text-sm opacity-60">{author}</em>
          )}{" "}
          <strong
            onClick={visitPost}
            className="tracking-wider link text-slate-800 opacity-80 group-hover:opacity-100"
          >
            {post.wine || post.title}
          </strong>{" "}
        </p>{" "}
      </div>
      <div className="w-32 text-center">
        <p>
          <small className="text-xs italic opacity-40">
            {dateFormated(post.createdAt)}
          </small>
        </p>
        <p className="space-x-3">
          <small className="text-xs opacity-50">💬 {comments.len()}</small>
          <small className="text-xs opacity-50">♥ {likeCount}</small>
        </p>
      </div>
    </li>
  );
}

function SearchQueryEmpty() {
  return (
    <p className="text-xl opacity-80 text-stone-700/50">⌨ počnite da kucate</p>
  );
}
function SearchQueryNotFound({ Q }) {
  return (
    <div className="text-xl text-center opacity-80 text-stone-700/50">
      <p>🛑 nije pronađeno</p>
      <p className="text-base italic opacity-60">{Q}</p>
    </div>
  );
}
