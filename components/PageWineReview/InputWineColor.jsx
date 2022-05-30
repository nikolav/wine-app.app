import {
  useGlobals,
  INPUT_WINE_COLOR_ACTIVE,
} from "../../src/hooks/use-globals";
import { prevent } from "../../src/util";

//
const classesInputWineColorButtonActive = {
  white: "text-yellow-500",
  rose: "text-pink-400",
  red: "text-red-800",
};
//
function InputWineColorButton({
  //
  // required; white | rose | red
  color,
  //
  //
  children,
  //
  classes = "",
  //
  ...rest
}) {
  const globals = useGlobals();
  const isChecked = color === globals(INPUT_WINE_COLOR_ACTIVE);
  const id = `InputWineColorButton_${color}`;
  //
  return (
    <label
      htmlFor={id}
      className={`py-2 text-center font-bold !transition !duration-100 cursor-pointer outline-none border-none ${
        isChecked
          ? `scale-[1.89] ${classesInputWineColorButtonActive[color]}`
          : "opacity-20 hover:opacity-40 hover:scale-110"
      } ${classes}`}
      onClick={prevent(() => globals.set(INPUT_WINE_COLOR_ACTIVE, color))}
      {...rest}
    >
      <input
        className="sr-only hidden"
        type="radio"
        name="color"
        value={color}
        id={id}
        checked={isChecked}
        readOnly
      />
      {children}
    </label>
  );
}
////
////
export default function InputWineColor() {
  return (
    <div className="flex flex-row items-center justify-around">
      <InputWineColorButton color="white">belo</InputWineColorButton>
      <InputWineColorButton color="rose">rosé</InputWineColorButton>
      <InputWineColorButton color="red">crno</InputWineColorButton>
    </div>
  );
}
