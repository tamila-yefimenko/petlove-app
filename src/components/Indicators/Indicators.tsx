import { components } from "react-select";
import s from "./Indicators.module.css";

export const SearchIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <svg className={s.icon}>
      <use href="/icons/sprite.svg#icon-search" />
    </svg>
  </components.DropdownIndicator>
);

export const ArrowIndicator = (props: any) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? (
        <svg className={s.icon}>
          <use href="/icons/sprite.svg#icon-chevron-down-1" />
        </svg>
      ) : (
        <svg className={s.icon}>
          <use href="/icons/sprite.svg#icon-chevron-down" />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

export const CustomClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <svg className={s.clearIcon} style={{ cursor: "pointer" }}>
        <use href="/icons/sprite.svg#icon-x" />
      </svg>
    </components.ClearIndicator>
  );
};
