import { useGlobals, INPUT_WINE_REVIEW } from "../../src/hooks/use-globals";
import { prevent } from "../../src/util";

//
const classesInputWineColorButtonActive = {
  white: "text-yellow-500",
  rose: "text-rose-300",
  red: "text-rose-800",
  // isClear: "text-slate-300",
  // isHazy: "text-stone-600",
  // isFizzy: "text-zinc-800",
  // tropsko: "text-orange-400",
  // vanila: "text-yellow-700",
  // bobice: "text-pink-800",
  // citrusi: "text-lime-400",
  // "voće": "text-rose-700",
  // bilje: "text-emerald-800",
  // drvo: "text-orange-900",
  // "začini": "text-stone-600",
};
//
function InputWineColorButton({
  //
  // required; white | rose | red
  value,
  //
  // input:radio.name
  name,
  //
  children,
  //
  //
  type = "radio",
  //
  classes = "",
  //
  ...rest
}) {
  const globals = useGlobals();
  const wineReview = globals(INPUT_WINE_REVIEW);
  //
  const isChecked = value === wineReview[name];
  const id = `InputWineColorButton_${value}`;
  const onClick = () => {
    //
    const newValue = isChecked ? null : value;
    globals.set(INPUT_WINE_REVIEW, { ...wineReview, [name]: newValue });
  };
  //
  return (
    <label
      htmlFor={id}
      className={`py-2 text-center font-bold !transition !duration-100 cursor-pointer ${
        isChecked
          ? `scale-150 ${classesInputWineColorButtonActive[value] || ""}`
          : "opacity-20 hover:opacity-40 hover:scale-110"
      } ${classes}`}
      onClick={prevent(onClick)}
      {...rest}
    >
      <input
        className="sr-only hidden"
        type={type}
        name={name}
        value={value}
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
export const InputWineColor = () => {
  //
  return (
    <div className="flex flex-row items-center justify-around">
      <InputWineColorButton name="color" value="white">
        belo
      </InputWineColorButton>
      <InputWineColorButton name="color" value="rose">
        rosé
      </InputWineColorButton>
      <InputWineColorButton name="color" value="red">
        crno
      </InputWineColorButton>
    </div>
  );
};

export const InputWineClearOrHazy = () => {
  return (
    <div className="flex flex-row items-center justify-around">
      <InputWineColorButton name="clearhazy" value="isClear">
        bistro
      </InputWineColorButton>
      <InputWineColorButton name="clearhazy" value="isHazy">
        mutno
      </InputWineColorButton>
    </div>
  );
};

export const InputWineFizzy = () => {
  return (
    <div className="flex flex-row items-center justify-around">
      <InputWineColorButton type="checkbox" name="isFizzy" value="isFizzy">
        penušavo
      </InputWineColorButton>
    </div>
  );
};

//
// voće, citrusi, cveće, tropsko, med, bobice, jabuka, kruška, bilje, minerali, začini, puter, kvasac, džem, drvo, vanila, čokolada
export const InputWineAroma = ({ ...rest }) => {
  return (
    <div {...rest}>
      <div className="flex flex-row items-center justify-around">
        <InputWineColorButton
          type="checkbox"
          name="aroma.citrus"
          value="citrusi"
        >
          citrusi
        </InputWineColorButton>
        <InputWineColorButton type="checkbox" name="aroma.fruit" value="voće">
          voće
        </InputWineColorButton>
      </div>
      <div className="flex flex-row items-center justify-around">
        <InputWineColorButton type="checkbox" name="aroma.spice" value="začini">
          začini
        </InputWineColorButton>
        <InputWineColorButton
          type="checkbox"
          name="aroma.berries"
          value="bobice"
        >
          bobice
        </InputWineColorButton>
      </div>
      <div className="flex flex-row items-center justify-around">
        <InputWineColorButton type="checkbox" name="aroma.herb" value="bilje">
          bilje
        </InputWineColorButton>
        <InputWineColorButton
          type="checkbox"
          name="aroma.tropical"
          value="tropsko"
        >
          tropsko
        </InputWineColorButton>
      </div>
      <div className="flex flex-row items-center justify-around">
        <InputWineColorButton type="checkbox" name="aroma.wood" value="drvo">
          drvo
        </InputWineColorButton>
        <InputWineColorButton
          type="checkbox"
          name="aroma.vanilla"
          value="vanila"
        >
          vanila
        </InputWineColorButton>
      </div>
    </div>
  );
};
