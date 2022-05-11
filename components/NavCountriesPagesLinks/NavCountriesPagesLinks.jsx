import { usePages } from "../../app/store";
import {
  PAGE_ITALY_WINE,
  PAGE_FRENCH_WINE,
  PAGE_SPANISH_WINE,
  PAGE_USA_WINE,
} from "../../app/store/page";

export default function NavCountriesPagesLinks() {
  const { page, setPage } = usePages();

  const countries = {
    [PAGE_ITALY_WINE]: {
      isActive: PAGE_ITALY_WINE === page.key,
      title: "italija",
    },
    [PAGE_FRENCH_WINE]: {
      isActive: PAGE_FRENCH_WINE === page.key,
      title: "francuska",
    },
    [PAGE_SPANISH_WINE]: {
      isActive: PAGE_SPANISH_WINE === page.key,
      title: "španija",
    },
    [PAGE_USA_WINE]: {
      isActive: PAGE_USA_WINE === page.key,
      title: "usa",
    },
  };

  return (
    <div className="text-white absolute z-10 top-0 inset-x-0 bg-slate-900 shadow">
      <ul className="list-none flex flex-row justify-around items-center">
        {Object.keys(countries).map((name) => (
          <li
            key={name}
            id={name}
            className={`p-4 pl-6 ${
              countries[name].isActive
                ? "isActive opacity-100"
                : "opacity-50 hover:opacity-80 active:opacity-100 cursor-pointer"
            }`}
            onClick={setPage.bind(null, name)}
          >
            <em>{countries[name].title}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
