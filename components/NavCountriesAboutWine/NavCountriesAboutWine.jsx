import { usePages } from "../../app/store";
import {
  PAGE_ITALY_WINE,
  PAGE_FRENCH_WINE,
  PAGE_SPANISH_WINE,
  PAGE_USA_WINE,
} from "../../app/store/page";
import { useFlags } from "../../src/hooks/use-flags-global";

export default function NavCountriesAboutWine({id}) {
  const iconsMap = {
    "flag-italy-52.png": PAGE_ITALY_WINE,
    "flag-france-52.png": PAGE_FRENCH_WINE,
    "flag-spain-52.png": PAGE_SPANISH_WINE,
    "flag-usa-52.png": PAGE_USA_WINE,
  };
  const icons = Object.keys(iconsMap);
  const { setPage } = usePages();
  const { toggle } = useFlags();
  const closeModal = () => toggle.off(id);
  
  return (
    <div className="text-white m-0 p-0 py-4 absolute bg-slate-900 bottom-0 inset-x-0 z-10 opacity-95 flex flex-row items-center justify-around w-7/12">
      {icons.map((image) => (
        <img
          key={image}
          src={image}
          alt=""
          width={52}
          height={52}
          onClick={() => {
            closeModal();
            setPage(iconsMap[image]);
          }}
          className="cursor-pointer rounded-full outline outline-white shadow hover:-translate-y-1 duration-75 transition-transform opacity-80 hover:opacity-100"
        />
      ))}
    </div>
  );
}
