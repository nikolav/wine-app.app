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
    <div className="absolute inset-x-0 bottom-0 z-10 flex flex-row items-center justify-around p-0 py-4 m-0 text-white bg-slate-900 opacity-95 lg:w-7/12">
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
          className="transition-transform duration-75 rounded-full shadow cursor-pointer outline outline-white hover:-translate-y-1 opacity-80 hover:opacity-100"
        />
      ))}
    </div>
  );
}
