import {useRouter} from "next/router";

//
const PreviewWineReview = () => {
  const router = useRouter();
  const {winereview_id : ID} = router.query;
  //
  router.push(`/${ID}`);
  //  
  return null;
};

//
export default PreviewWineReview;
