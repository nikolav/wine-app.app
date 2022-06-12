import { useEffect, useState, createContext, useContext } from "react";
import useQueryArticles, {
  useQueryWineReviews,
  useQueryAppData,
} from "../../src/hooks/use-query-resource";

//
const WineReviewContext = createContext();
const ArticlesContext = createContext();
const AppDataContext = createContext();
//
export const useWineReview = () => useContext(WineReviewContext);
export const useArticles = () => useContext(ArticlesContext);
export const useAppData = () => useContext(AppDataContext);
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
export function AppDataProvider({ children }) {
  const [appData, setAppData] = useState(null);
  const query = useQueryAppData();
  //
  useEffect(() => {
    if (!query.isLoading && query.error) return;
    if (!query.isLoading && !query.error && query.data)
      setAppData(query.data.data);
  }, [query.error, query.isLoading, query.data?.data]);
  //
  const value = { appdata: appData, query };
  //
  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
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
