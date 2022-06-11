import React from "react";
import { useRouter } from "next/router";
import { useArticles } from "../../app/store";
import { CommentsLike } from "../../components/social";
//
import Image from "next/image";
import imagePlaceholder from "../../public/placeholder01.png";
import { bgArticleImage } from "./Article.module.css";
//
const PreviewArticle = () => {
  const router = useRouter();
  const { article_id: ID } = router.query;
  const { articles } = useArticles();
  const article = (articles ?? []).find((a) => ID === a._id);

  return (
    <>
      <div
        style={{
          gridTemplateColumns: "58% auto",
        }}
        className="md:grid md:grid-cols-2 h-screen overflow-hidden ***bg-yellow-200"
      >
        {/*  */}
        {/* --window-LEFT article */}
        <section className="***bg-red-200 overflow-y-auto scrollbar-thin p-6 !pb-0">
          <div
            id="paper--aejenethrto"
            className="bg-white rounded-t-2xl p-6 shadow-lg"
          >
            <article className="prose">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias sapiente sint laudantium sed assumenda ut amet
                perferendis corporis hic earum, ullam veritatis est sequi
                debitis eaque voluptatem rem deserunt quas!!
              </p>
            </article>
          </div>
        </section>
        {/*  */}
        {/* --window-RIGHT image preview */}
        <section
          className={`${bgArticleImage} h-full overflow-hidden relative`}
        >
          <Image
            alt=""
            layout="fill"
            src={article?.image ?? imagePlaceholder.src}
            className="object-cover object-center block m-0 p-0 border-0"
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
    </>
  );
};

//
export default PreviewArticle;
