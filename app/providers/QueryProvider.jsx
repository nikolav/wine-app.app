import { QueryClient, QueryClientProvider } from "react-query";
const client_ = new QueryClient();
//
export default function QueryProvider({ children }) {
  return <QueryClientProvider client={client_}>{children}</QueryClientProvider>;
}
