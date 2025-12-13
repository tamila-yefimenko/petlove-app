import { useEffect, useMemo } from "react";
import Select from "react-select";
import debounce from "lodash.debounce";
import s from "./NoticesFilters.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SearchField from "../SearchField/SearchField";
import { selectStyles } from "../../utils/selectStyles";

import {
  fetchCategories,
  fetchSpecies,
  fetchSex,
  fetchLocations,
  searchCities,
} from "../../redux/noticesFilters/operations";

import {
  setFilter,
  resetFilters,
  setByPrice,
  setByPopularity,
} from "../../redux/noticesFilters/slice";

const NoticesFilters: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    category,
    species,
    sex,
    locationId,
    byPopularity,
    byPrice,
    categories,
    speciesList,
    sexList,
    allLocations,
  } = useAppSelector((state) => state.noticesFilters);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSpecies());
    dispatch(fetchSex());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(setFilter({ key: "keyword", value: value.trim() }));
  };

  const loadCities = useMemo(
    () =>
      debounce((value: string) => {
        const trimmed = value.trim();
        if (trimmed.length >= 3 && trimmed.length <= 48) {
          dispatch(searchCities(trimmed));
        }
      }, 400),
    [dispatch]
  );

  useEffect(() => () => loadCities.cancel(), [loadCities]);

  const handleChange =
    (key: "category" | "sex" | "species" | "locationId") => (opt: any) => {
      dispatch(
        setFilter({
          key,
          value: opt ? opt.value : "",
        })
      );
    };

  const withShowAll = (list: string[]) => [
    { value: "", label: "Show all" },
    ...list.map((item) => ({ value: item, label: item })),
  ];

  const categoryOptions = withShowAll(categories);
  const genderOptions = withShowAll(sexList);
  const typeOptions = withShowAll(speciesList);

  const cityOptions = allLocations.map((loc: any) => ({
    value: loc._id,
    label: `${loc.cityEn}, ${loc.stateEn}`,
  }));

  const getSelectValue = (value: string, options: any[]) =>
    value ? options.find((o) => o.value === value) : null;

  const handleReset = () => {
    dispatch(resetFilters());
    loadCities.cancel();
  };

  return (
    <div className={s.filters}>
      <div className={s.filtersWrapper}>
        <SearchField onSubmit={handleSearch} className={s.searchField} />

        <div className={s.categorySex}>
          <Select
            styles={selectStyles}
            classNamePrefix="react-select"
            options={categoryOptions}
            placeholder="Category"
            value={getSelectValue(category, categoryOptions)}
            onChange={handleChange("category")}
          />

          <Select
            styles={selectStyles}
            classNamePrefix="react-select"
            options={genderOptions}
            placeholder="By gender"
            value={getSelectValue(sex, genderOptions)}
            onChange={handleChange("sex")}
          />
        </div>

        <Select
          styles={selectStyles}
          classNamePrefix="react-select"
          options={typeOptions}
          placeholder="By type"
          value={getSelectValue(species, typeOptions)}
          onChange={handleChange("species")}
        />

        <Select
          styles={selectStyles}
          classNamePrefix="react-select"
          options={cityOptions}
          placeholder="Location"
          isClearable
          value={getSelectValue(locationId, cityOptions)}
          onChange={handleChange("locationId")}
          onInputChange={loadCities}
        />
      </div>

      <div className={s.sortWrapper}>
        <input
          type="radio"
          id="popular"
          className={s.sort}
          checked={byPopularity === false}
          onChange={() => {
            dispatch(setByPopularity(false));
            dispatch(setByPrice(null));
          }}
        />
        <label htmlFor="popular" className={s.radioLabel}>
          Popular
        </label>

        <input
          type="radio"
          id="unpopular"
          className={s.sort}
          checked={byPopularity === true}
          onChange={() => {
            dispatch(setByPopularity(true));
            dispatch(setByPrice(null));
          }}
        />
        <label htmlFor="unpopular" className={s.radioLabel}>
          Unpopular
        </label>

        <input
          type="radio"
          id="cheap"
          className={s.sort}
          checked={byPrice === true}
          onChange={() => {
            dispatch(setByPrice(true));
            dispatch(setByPopularity(null));
          }}
        />
        <label htmlFor="cheap" className={s.radioLabel}>
          Cheap
        </label>

        <input
          type="radio"
          id="expensive"
          className={s.sort}
          checked={byPrice === false}
          onChange={() => {
            dispatch(setByPrice(false));
            dispatch(setByPopularity(null));
          }}
        />
        <label htmlFor="expensive" className={s.radioLabel}>
          Expensive
        </label>
      </div>

      <button className={s.resetBtn} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default NoticesFilters;
