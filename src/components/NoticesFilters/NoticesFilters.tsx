import { useEffect, useMemo } from "react";
import Select from "react-select";
import debounce from "lodash.debounce";
import s from "./NoticesFilters.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

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
import SearchField from "../SearchField/SearchField";

const NoticesFilters: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    keyword,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    return () => loadCities.cancel();
  }, [loadCities]);

  const cityOptions = allLocations.map((loc: any) => ({
    value: loc._id,
    label: `${loc.cityEn}, ${loc.stateEn}`,
  }));

  const selectedCity =
    cityOptions.find((option) => option.value === locationId) || null;

  const handleCityChange = (opt: any) => {
    dispatch(setFilter({ key: "locationId", value: opt ? opt.value : "" }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    loadCities.cancel();
  };

  return (
    <div className={s.filters}>
      <SearchField onSubmit={handleSearch} />

      <select
        className={s.select}
        value={category}
        onChange={(e) =>
          dispatch(setFilter({ key: "category", value: e.target.value }))
        }>
        <option value="">Category</option>
        {categories.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className={s.select}
        value={species}
        onChange={(e) =>
          dispatch(setFilter({ key: "species", value: e.target.value }))
        }>
        <option value="">Species</option>
        {speciesList.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className={s.select}
        value={sex}
        onChange={(e) =>
          dispatch(setFilter({ key: "sex", value: e.target.value }))
        }>
        <option value="">Sex</option>
        {sexList.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <Select
        className={s.citySelect}
        options={cityOptions}
        onChange={handleCityChange}
        placeholder="City"
        isClearable
        value={selectedCity}
      />

      <div className={s.sortWrapper}>
        <label>
          <input
            type="radio"
            name="popularity"
            value="popular"
            checked={byPopularity === false}
            onChange={() => {
              dispatch(setByPopularity(false));
              dispatch(setByPrice(null));
            }}
          />
          Popular
        </label>

        <label>
          <input
            type="radio"
            name="popularity"
            value="unpopular"
            checked={byPopularity === true}
            onChange={() => {
              dispatch(setByPopularity(true));
              dispatch(setByPrice(null));
            }}
          />
          Unpopular
        </label>

        <label>
          <input
            type="radio"
            name="price"
            value="cheap"
            checked={byPrice === true}
            onChange={() => {
              dispatch(setByPrice(true));
              dispatch(setByPopularity(null));
            }}
          />
          Cheap
        </label>

        <label>
          <input
            type="radio"
            name="price"
            value="expensive"
            checked={byPrice === false}
            onChange={() => {
              dispatch(setByPrice(false));
              dispatch(setByPopularity(null));
            }}
          />
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
