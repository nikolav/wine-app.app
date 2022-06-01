import useInputSynced from "../../src/hooks/use-input-synced";
import { FaRegSave } from "../icons";
import { useGlobals, INPUT_WINE_REVIEW } from "../../src/hooks/use-globals";
import DrawerBox from "../DrawerBox/DrawerBox";
import { prevent } from "../../src/util";

//
export default function PageWineReviewDescription({
  children,
  isActive,
  onClose,
}) {
  const globals = useGlobals();
  const wineReview = globals(INPUT_WINE_REVIEW);
  //
  const { inputs, sync } = useInputSynced({ description: "" });
  const sync_ = (evt) => {
    globals.set(INPUT_WINE_REVIEW, {
      ...wineReview,
      description: evt?.target?.value || "",
    });
    sync(evt);
  };
  ////
  ////
  return (
    <DrawerBox
      isActive={isActive}
      onClose={onClose}
      classes="!border-l-stone-800 bg-stone-50"
    >
      <div className="prose h-full">
        {/*  */}
        <div className="md:w-10/12 mx-auto md:mt-24">
          <h4 className="text-stone-300 text-right italic px-2 md:px-6">
            Opišite vino detaljnije
          </h4>
          <form onSubmit={prevent()} noValidate>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="12"
              className="scrollbar-thin placeholder:italic placeholder:opacity-30 block w-full p-4 border-stone-200 shadow-sm focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50 rounded-xl"
              placeholder="Opis..."
              value={inputs?.description}
              onChange={sync_}
            />
          </form>
          {/*  */}
          <button
            onClick={prevent(onClose)}
            type="button"
            className="block button text-2xl ml-auto p-4 mt-4 px-6 mr-6 bg-stone-800 hover:bg-stone-900 active:bg-black"
          >
            <strong className="text-3xl pr-2">
              <FaRegSave className="!inline-block text-white text-3xl opacity-40" />
            </strong>{" "}
            ok
          </button>
        </div>
      </div>
      {children}
    </DrawerBox>
  );
}
