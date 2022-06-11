import React from "react";
import { useRouter } from "next/router";
import { useArticles } from "../../app/store";
import { CommentsLike } from "../../components/social";
//
import Image from "next/image";
import imagePlaceholder from "../../public/placeholder01.png";
import { bgArticleImage } from "./Article.module.css";
import { slateSerialize } from "../../components/SlateEditable/SlateEditable";
//
const PreviewArticle = () => {
  const router = useRouter();
  const { article_id: ID } = router.query;
  const { articles } = useArticles();
  const article = (articles ?? []).find((a) => ID === a._id);

  return (
    <div className="h-screen overflow-y-auto scrollbar-thin">
      <div
        style={{
          gridTemplateColumns: "58% auto",
        }}
        className="flex flex-col lg:flex-none lg:!grid h-full lg:overflow-hidden"
      >
        <section className="lg:overflow-y-auto scrollbar-thin">
          <div className="sm:pt-4 md:pt-8">
            <article className="prose min-h-screen mx-auto bg-white p-6 sm:rounded-t-2xl shadow-lg">
              {article ? (
                <>
                  <h1 className="pb-2 italic text-slate-900/40 text-center md:text-right lg:pr-4 border-b-2 border-b-slate-900/40">{article.title}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: slateSerialize(JSON.parse(article.body)),
                    }}
                  />
                </>
              ) : null}
            </article>
          </div>
        </section>
        <section
          className={`${bgArticleImage} lg:shadow-lg lg:border-l-4 lg:border-l-white order-first lg:order-none min-h-screen relative`}
        >
          <Image
            alt=""
            layout="fill"
            src={article?.image ?? imagePlaceholder.src}
            className="object-cover object-center block"
          />
          {null != article ? (
            <CommentsLike
              size="!sm"
              id={`article--${article._id}`}
              className="absolute top-2 left-2"
              placement="bottom-end"
            />
          ) : null}
        </section>
      </div>
    </div>
  );
};

//
export default PreviewArticle;
