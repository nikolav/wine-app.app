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
  const sync = (evt) => {
    globals.set(INPUT_WINE_REVIEW, {
      ...wineReview,
      description: evt.target.value,
    });
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
        <div className="px-1 mt-16 sm:px-4 md:px-6 lg:px-12">
          <h4 className="px-2 italic text-right text-stone-400 md:px-6">
            Opišite vino detaljnije
          </h4>
          <form onSubmit={prevent()} noValidate>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="12"
              className="block w-full p-4 shadow-sm scrollbar-thin placeholder:italic placeholder:opacity-30 border-stone-200 focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50 rounded-xl"
              placeholder="Opis..."
              value={wineReview.description}
              onChange={sync}
            />
          </form>
          {/*  */}
          <button
            onClick={onClose}
            type="button"
            className="flex flex-row items-center p-4 px-6 mt-4 ml-auto mr-6 text-2xl button bg-stone-800 hover:bg-stone-900 center gap-x-4"
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
