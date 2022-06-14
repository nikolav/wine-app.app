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
  const wr = winereview?.find((node) => ID === node._id) || null;
  //
  useEffect(() => {
    console.log(wr);
    globals.set(WR_IS_PREVIEW, wr);
    router.push(`/`);
  }, []);
  //
  //
  return null;
};

//
export default PreviewWineReview;
