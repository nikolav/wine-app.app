import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useGlobals, WR_IS_PREVIEW } from "../../src/hooks/use-globals";
import { useWineReview } from "../../app/store";
import useIsMounted from "../../src/hooks/use-is-mounted";
//
const PreviewWineReview = () => {
  const router = useRouter();
  const { winereview_id: ID } = router.query;
  const globals = useGlobals();
  const { winereview } = useWineReview();
  const isMounted = useIsMounted();
  const wr = useRef(winereview?.find((node) => ID === node._id));
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
    if (wr.current) {
      console.log(ID);
      console.log(winereview);
      console.log(wr);
      globals.set(WR_IS_PREVIEW, wr.current);
      router.push(`/`);
    }
  }, [wr.current]);
  //
  //https://wine-app0.herokuapp.com/winereview/62a90650e7901336c3981c1b
  return null;
};

//
export default PreviewWineReview;
