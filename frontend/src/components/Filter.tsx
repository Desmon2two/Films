import type { FilterProps } from "../types/FilterPropsType";

export function Filter({limit, setLimit}: FilterProps) {
    return (
    <div className="filter">
          <p className="filter__annotation">
            Set how many videos should be displayed
          </p>
          <input
            type="number"
            className="filter__input"
            min={1}
            value={limit}
            onChange={(element) => {
              let val = Number(element.target.value);
              if (Number.isNaN(val)) throw new Error("Invalid input");
              if(val < 1) val = 1;
              setLimit(val);
            }}
          />
          </div>
  );
}
