import { useState, useEffect, useRef } from "react";
import "animate.css";

const DEFAULT_EFFECT = "headShake";
const DEFAULT_DURATION = 1122;
//
export const EFFECTS = {
  // @@Attention seekers
  // bounce
  // flash
  // pulse
  // rubberBand
  // shakeX
  // shakeY
  // headShake
  // swing
  // tada
  // wobble
  // jello
  // heartBeat
  // // @@Back entrances
  // backInDown
  // backInLeft
  // backInRight
  // backInUp
  // // @@Back exits
  // backOutDown
  // backOutLeft
  // backOutRight
  // backOutUp
  // // @@Bouncing entrances
  // bounceIn
  // bounceInDown
  // bounceInLeft
  // bounceInRight
  // bounceInUp
  // // @@Bouncing exits
  // bounceOut
  // bounceOutDown
  // bounceOutLeft
  // bounceOutRight
  // bounceOutUp
  // // @@Fading entrances
  // fadeIn
  // fadeInDown
  // fadeInDownBig
  // fadeInLeft
  // fadeInLeftBig
  // fadeInRight
  // fadeInRightBig
  // fadeInUp
  // fadeInUpBig
  // fadeInTopLeft
  // fadeInTopRight
  // fadeInBottomLeft
  // fadeInBottomRight
  // // @@Fading exits
  // fadeOut
  // fadeOutDown
  // fadeOutDownBig
  // fadeOutLeft
  // fadeOutLeftBig
  // fadeOutRight
  // fadeOutRightBig
  // fadeOutUp
  // fadeOutUpBig
  // fadeOutTopLeft
  // fadeOutTopRight
  // fadeOutBottomRight
  // fadeOutBottomLeft
  // // @@Flippers
  // flip
  // flipInX
  // flipInY
  // flipOutX
  // flipOutY
  // // @@Lightspeed
  // lightSpeedInRight
  // lightSpeedInLeft
  // lightSpeedOutRight
  // lightSpeedOutLeft
  // // @@Rotating entrances
  // rotateIn
  // rotateInDownLeft
  // rotateInDownRight
  // rotateInUpLeft
  // rotateInUpRight
  // // @@Rotating exits
  // rotateOut
  // rotateOutDownLeft
  // rotateOutDownRight
  // rotateOutUpLeft
  // rotateOutUpRight
  // // @@Specials
  // hinge
  // jackInTheBox
  // rollIn
  // rollOut
  // // @@Zooming entrances
  // zoomIn
  // zoomInDown
  // zoomInLeft
  // zoomInRight
  // zoomInUp
  // // @@Zooming exits
  // zoomOut
  // zoomOutDown
  // zoomOutLeft
  // zoomOutRight
  // zoomOutUp
  // // @@Sliding entrances
  // slideInDown
  // slideInLeft
  // slideInRight
  // slideInUp
  // // @@Sliding exits
  // slideOutDown
  // slideOutLeft
  // slideOutRight
  // slideOutUp
};

export default function Effect({
  effect,
  isActive,
  onEnd,
  duration,
  children,
  ...rest
}) {
  {
    /* 
<Effect 
  effect="flip" 
  isActive={flag} 
  onEnd={callback} 
  duration={1122}>
  <button>ok</button>
</Effect> 
*/
  }

  const [isEnded, setIsEnded] = useState(true);
  const refDiv = useRef();

  useEffect(() => {
    if (!isActive) return;
    if (!isEnded) return;

    setIsEnded((_) => false);

    AnimateCss_(refDiv.current, effect, duration).then(onend_);
  }, [isActive]);

  
  return <div ref={refDiv} {...rest}>{children}</div>;

  function onend_(...args) {
    setIsEnded((_) => true);
    return (onEnd || noop_).apply(this, args);
  }
}

//
// helpers
function AnimateCss_(
  node,
  animation = DEFAULT_EFFECT,
  duration = DEFAULT_DURATION
) {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animation_ = `animate__${animation}`;
    //
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
    node.style.setProperty("--animate-duration", `${duration / 1000}s`);
    node.classList.add("animate__animated", animation_);

    // cleanup
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove("animate__animated", animation_);
      resolve(event);
    }
  });
}

function noop_() {}
