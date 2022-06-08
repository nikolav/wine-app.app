import { useEffect, useState, createContext, useContext } from "react";
import useQueryArticles, {
  useQueryWineReviews,
} from "../../src/hooks/use-query-resource";

//
const WineReviewContext = createContext();
const ArticlesContext = createContext();
//
export const useWineReview = () => useContext(WineReviewContext);
export const useArticles = () => useContext(ArticlesContext);
////
////
export function WineReviewProvider({ children }) {
  const [winereview, setWinereview] = useState(null);
  const query = useQueryWineReviews();
  //
  useEffect(() => {
    if (!query.isLoading && query.error) return;
    if (!query.isLoading && !query.error && query.data)
    setWinereview(query.data.data);
  }, [query.error, query.isLoading, query.data?.data]);
  //
  const valueWR = { winereview, query };
  //
  return (
    <WineReviewContext.Provider value={valueWR}>
      {children}
    </WineReviewContext.Provider>
  );
}
////
////
export default function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState(null);
  const query = useQueryArticles();
  //
  useEffect(() => {
    if (!query.isLoading && query.error) return;
    if (!query.isLoading && !query.error && query.data)
      setArticles(query.data.data);
  }, [query.error, query.isLoading, query.data?.data]);
  //
  const valueArticles = { articles, query };
  //
  return (
    <ArticlesContext.Provider value={valueArticles}>
      {children}
    </ArticlesContext.Provider>
  );
}

