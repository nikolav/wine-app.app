import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobals, WR_IS_PREVIEW_ID } from "../../src/hooks/use-globals";
//
const PreviewWineReview = () => {
  const router = useRouter();
  const { winereview_id: ID } = router.query;
  const globals = useGlobals();
  //
  useEffect(() => {
    if (ID) {
      globals.set(WR_IS_PREVIEW_ID, ID);
      router.push(`/`);
    }
  }, [ID]);
  //
  return null;
};

//
export default PreviewWineReview;
