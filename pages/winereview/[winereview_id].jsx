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
  // const wr = winereview?.find((node) => ID === node._id);
  //
  //
  // useEffect(() => {
  //   console.log(ID)
  //   console.log(wr)
  //   console.log(winereview)
  //   globals.set(WR_IS_PREVIEW, wr);
  //   router.push(`/`);
  // }, []);
  useEffect(() => {
    console.log(ID)
    console.log(winereview)
    if (winereview) {
      globals.set(
        WR_IS_PREVIEW,
        winereview.find((node) => ID === node._id)
      );
      router.push(`/`);
    }
  }, [winereview, ID]);
  //
  //https://wine-app0.herokuapp.com/winereview/62a90650e7901336c3981c1b
  return null;
};

//
export default PreviewWineReview;
