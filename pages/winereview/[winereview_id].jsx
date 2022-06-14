import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobals, WR_IS_PREVIEW } from "../../src/hooks/use-globals";
import { useWineReview } from "../../app/store";
//
const PreviewWineReview = () => {
  const router = useRouter();
  const { winereview_id: ID } = router.query;
  const globals = useGlobals();
  const { winereview } = useWineReview();
  const wr = winereview?.find((node) => ID === node._id);
  //
  console.log(ID)
  //
  useEffect(() => {
    console.log(wr);
    globals.set(WR_IS_PREVIEW, wr);
    router.push(`/`);
  }, []);
  //
  //https://wine-app0.herokuapp.com/winereview/62a90650e7901336c3981c1b
  return null;
};

//
export default PreviewWineReview;
