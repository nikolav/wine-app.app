import Required from "../Required/Required";
import useInputSynced from "../../src/hooks/use-input-synced";
import { noop } from "../../src/util";

////
////
export default function PageWineReviewInput({
    //
    // `input.name`
    //   required: true
    name,
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
    const { sync, inputs } = useInputSynced({ [name]: "" });
    const inputSync = (evt) => {
      onChange(evt?.target?.value);
      sync(evt);
    };
    ////
    ////
    return (
      <div className={`flex flex-row items-center ${classes}`} {...rest}>
        {true === isRequired && <Required input={inputs?.[name] || ""} />}
        <input
          className={`placeholder:text-sm pl-2 !inline-block !bg-transparent input-underline **grow`}
          name={name}
          onChange={inputSync}
          value={inputs?.[name] || ""}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
        />
      </div>
    );
  }
  