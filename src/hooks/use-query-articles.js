import { useQuery } from "react-query";
import axios from "axios";
import { skipEndSlashes } from "../util";
import { URL_LOCAL } from "../feathers";
//

export const DEFAULT_QUERY_CONFIG = {
  // refresh data on every window focus
  // refetchOnWindowFocus: true,

  // how oftern to refetch data
  staleTime: 23456, // [0], `Infinity`: fresh forever, refetch manually

  // ttl for cached/hiden query for memcached data thats not displaying
  cacheTime: 5 * 60 * 1000, // in ms; `Infinity` doesnt gc queries

  // how many times to retry failed query
  retry: false, // number | boolean | 0 [3]
  // retryDelay: number [sec] | func 

  //  enable dependent queries;
  //    allow query to run after prev. data has been fetched
  //  run q query if other data is available
  //  dependent queries start in .isIdle state
  enabled: true,

  // use existing query data seed
  // initialData: any,
  // initialData: () => queryCache.getQueryData("posts"),

  // show initial data but fetch on component mount
  initialStale: true,

  //   • access RQ cache
  //   queryCache {
  //   .getQueryData(query: string): data[]
  //   .setQueryData(key: [string, data-ID], data: object)
  //   .invalidateQueries(key: string|array, [opts])
  //     // with .refetchActive=true opt: mark queries as stale for next refetch
  //   preload data imperatively wihout any user actions taken,
  //   populate cache with some predicted/popular data to show,
  //     or .onHover to populate page data
  //   .prefetchQuery([key,id], fetcher: ()=>void, [opts]); can take options same as .useQuery
  // }

  // poll interval [ms]
  refetchInterval: 56789,
  //
  //  onSuccess: (data) => null,
  //  onError: (error) => null,
  //  onSettled: (data, error) => null,
};

//
export default function useQueryArticles(config = {}) {
  return useQuery(
    "articles",
    () =>
      axios
        .get(`${skipEndSlashes(URL_LOCAL)}/articles`)
        .then((res) => res.data),
    {
      ...DEFAULT_QUERY_CONFIG,
      ...config,
    }
  );
}
