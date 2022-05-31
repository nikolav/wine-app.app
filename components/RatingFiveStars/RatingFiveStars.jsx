import React, { useEffect } from "react";
import { BsStarFill } from "../icons";
import { useGlobals, STAR_RATING } from "../../src/hooks/use-globals";
import { noop } from "../../src/util";
////
////
const RatingFiveStars = ({
  //
  id,
  //
  onChange = noop,
  //
  // .font-size
  size = 64,
  //
  //
  // start count default
  starCount = 5,
  classInactive = "text-stone-200",
  classActive = "!text-amber-400",
  //
  ...rest
}) => {
  const globals = useGlobals();
  const starRatings = globals(STAR_RATING);
  const rating = starRatings[id];
  //
  useEffect(() => {
    onChange(rating);
  }, [rating]);
  ////
  ////
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4">
        {Array.from(".".repeat(starCount)).map((dot, i) => (
          <strong
            key={i}
            onClick={() =>
              globals.set(STAR_RATING, { ...starRatings, [id]: i })
            }
            className="cursor-pointer opacity-80 hover:opacity-90 active:opacity-100 hover:rotate-1 transition duration-150 hover:scale-125"
          >
            <BsStarFill
              style={{
                fontSize: size,
              }}
              className={`${classInactive} ${
                null != rating
                  ? i <= rating
                    ? classActive
                    : classInactive
                  : ""
              }`}
              {...rest}
            />
          </strong>
        ))}
      </div>
    </>
  );
};

export default RatingFiveStars;
