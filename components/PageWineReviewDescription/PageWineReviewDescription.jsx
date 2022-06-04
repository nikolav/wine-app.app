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
      classes="!border-l-stone-800 bg-stone-50/95 bg-backdrop-blur-sm"
    >
      <div className="h-full overflow-y-auto scrollbar-thin">
        {/*  */}
        <div className="px-1 sm:px-4 md:px-6 lg:px-12 mt-16">
          <h4 className="text-stone-400 text-right italic px-2 md:px-6">
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
            className="button ml-auto p-4 px-6 mt-4 mr-6 bg-stone-800 hover:bg-stone-900 flex flex-row items-center center gap-x-4 text-2xl"
          >
            <strong>
              <FaRegSave className="!inline-block text-white opacity-40" />
            </strong>
            <strong>ok</strong>
          </button>
        </div>
      </div>
      {children}
    </DrawerBox>
  );
}
