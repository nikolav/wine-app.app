import useGravatar from "../src/hooks/use-gravatar";
import iconRefresh from "../src/etc/icon-refresh.svg";
import css from "./Gravatar.module.css";

const GRAVATAR_SIZE = 64;

// https://en.gravatar.com/site/implement/images/
export default function Gravatar({ size = GRAVATAR_SIZE, email, ...rest }) {
  const [gravatar, reloadGravatar] = 
    useGravatar(email, GRAVATAR_SIZE);

  return (
    <div
      className={css.gravatarDiv}
      style={{
        width: size,
        height: size,
        backgroundImage: `url("${gravatar}")`,
      }}
      {...rest}
    >
      <span className={css.gravatarSpan}>
        <img
          src={Object(iconRefresh).src}
          className={css.gravatarIcon}
          onClick={reloadGravatar}
          alt=""
        />
      </span>
    </div>
  );
  // return <img width={DEFAULT_IMAGE_SIZE} src={gravatar} alt="" {...rest} />;
}
