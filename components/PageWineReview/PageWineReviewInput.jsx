import Required from "../Required/Required";
import { noop } from "../../src/util";
////
////
export default function PageWineReviewInput({
  //
  // `input.name`
  //   required: true
  name,
  //
  // sets globaly cached `input.value` on <inputs>
  value = "",
  //
  // passes current `input.value` to callback
  onChange = noop,
  //
  // renders <Required> component befor <input>
  isRequired = false,
  //
  // `input.placeholder` prop
  placeholder = "",
  //
  // `input.type`
  type = "text",
  //
  // append classes to <div>
  classes = "",
  //
  // caches value on mount/unmount
  isCaching = false,
  //
  ...rest
}) {
  // const { sync, inputs } = useInputSynced({ [name]: "" });
  const inputSync = (evt) => {
    onChange({ name, value: evt?.target?.value });
    // sync(evt);
  };
  ////
  ////
  return (
    <div className={`flex flex-row items-center ${classes}`} {...rest}>
      {true === isRequired && <Required input={value} />}
      <input
        className={`placeholder:text-sm pl-2 input-underline`}
        name={name}
        onChange={inputSync}
        //
        // dont sync <input> localy
        // sync from global value passed to <C>
        // value={inputs?.[name] || ""}
        value={value}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
      />
    </div>
  );
}
