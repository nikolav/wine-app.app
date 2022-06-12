import React, { useState } from "react";
import { useRouter } from "next/router";
import { useArticles } from "../../app/store";
import { CommentsLike } from "../../components/social";
import Image from "next/image";
import imagePlaceholder from "../../public/placeholder01.png";
// import { bgArticleImage } from "./Article.module.css";
import { slateSerializeHTML } from "../../components/SlateEditable/SlateEditable";
import PortalOverlays from "../../components/PortalOverlays";
import { FaHome } from "../../components/icons";
import Tooltip from "../../components/Tooltip/Tooltip";
import useStateSwitch from "../../src/hooks/use-state-switch";
//
const PreviewArticle = () => {
  const router = useRouter();
  const { article_id: ID } = router.query;
  const { articles } = useArticles();
  const article = (articles ?? []).find((a) => ID === a._id);
  //
  const [refPopperHome, setRefPopperHome] = useState(null);
  const { isOn: isActiveHome, toggle: toggleIsActiveHome } = useStateSwitch();
  const navigateHome = () => router.push("/");
  //
  return (
    <>
      <PortalOverlays>
        <span
          ref={setRefPopperHome}
          onMouseOver={toggleIsActiveHome.on}
          onMouseLeave={toggleIsActiveHome.off}
          className="fixed z-10 top-2 left-[50%] text-5xl text-slate-900"
        >
          <FaHome
            onClick={navigateHome}
            className="cursor-pointer opacity-40 hover:opacity-60 hover:scale-110 transition-transform duration-75"
          />
        </span>
        <Tooltip
          offset={[0, 12]}
          refElement={refPopperHome}
          isActive={isActiveHome}
          placement="bottom"
        >
          🏡 nazad na početnu stranu
        </Tooltip>
      </PortalOverlays>
      <div className="h-screen overflow-y-auto scrollbar-thin">
        <div
          style={{
            gridTemplateColumns: "55% auto",
          }}
          className="flex flex-col lg:flex-none lg:!grid h-full lg:overflow-hidden"
        >
          <section className="lg:overflow-y-auto scrollbar-thin">
            <div className="sm:pt-4 md:pt-8">
              <article className="prose min-h-screen mx-auto bg-white p-6 sm:rounded-t-2xl shadow-lg">
                {article ? (
                  <>
                    <h1 className="pb-2 italic text-slate-900/40 text-center md:text-right lg:pr-4 border-b-2 border-b-slate-900/40">
                      {article.title}
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: slateSerializeHTML(JSON.parse(article.body)),
                      }}
                    />
                  </>
                ) : null}
              </article>
            </div>
          </section>
          <section className="lg:shadow-lg lg:border-l-4 lg:border-l-white order-first lg:order-none min-h-screen relative">
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
    </>
  );
};

//
export default PreviewArticle;
