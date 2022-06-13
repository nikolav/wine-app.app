import { useAppData } from "../../app/store";
import { postType, stripEndSlashes } from "../util";
//
export default function useGetPostLink() {
  const { appdata } = useAppData();

  return (post) => {
    let domain;
    //
    if (!post) return "/";
    domain = appdata?.find((node) => "app.url" === node.name)?.value || "/";
    //
    return `${stripEndSlashes(domain)}/${postType(post)}/${post._id}`;
  };
}
