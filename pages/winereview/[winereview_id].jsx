import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobals, WR_IS_PREVIEW_ID } from "../../src/hooks/use-globals";
//
const PreviewWineReview = () => {
  const router = useRouter();
  const { winereview_id: ID } = router.query;
  const globals = useGlobals();
  //
  // useEffect(() => {
  //   console.log(ID)
  //   console.log(wr)
  //   console.log(winereview)
  //   globals.set(WR_IS_PREVIEW, wr);
  //   router.push(`/`);
  // }, []);
  useEffect(() => {
    if (ID) {
      console.log(ID);
      globals.set(WR_IS_PREVIEW_ID, ID);
      router.push(`/`);
    }
  }, [ID]);
  //
  //https://wine-app0.herokuapp.com/winereview/62a90650e7901336c3981c1b
  return null;
};

//
export default PreviewWineReview;
