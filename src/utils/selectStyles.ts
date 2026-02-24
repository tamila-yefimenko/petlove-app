export const getSelectStyles = (
  isTablet: boolean,
  withBorder?: boolean,
  hasError?: boolean,
) => ({
  control: (base: any, state: any) => ({
    ...base,
    minHeight: isTablet ? (withBorder ? "52px" : "48px") : "42px",
    width: "100%",
    borderRadius: "30px",
    border: hasError
      ? "1px solid #ef2447"
      : state.isFocused
        ? "1px solid #f6b83d"
        : withBorder
          ? "1px solid rgba(38,38,38,0.15)"
          : "1px solid transparent",
    boxShadow: "none",
    padding: "0 8px",
    cursor: "pointer",
    backgroundColor: "#fff",

    "&:hover": {
      border: hasError ? "1px solid #ef2447" : "1px solid #f6b83d",
      boxShadow: "none",
    },
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: "0 8px",
    justifyContent: "flex-start",
  }),

  placeholder: (base: any) => ({
    ...base,
    color: withBorder ? "rgba(38, 38, 38, 0.5)" : "#262626",
    fontSize: isTablet ? "16px" : "14px",
    marginLeft: 0,
    textAlign: "left",
  }),

  singleValue: (base: any, state: any) => ({
    ...base,
    fontSize: isTablet ? "16px" : "14px",
    marginLeft: 0,
    textAlign: "left",
    color: state.data.value === "" ? "#f6b83d" : "#262626",
  }),

  menu: (base: any) => ({
    ...base,
    borderRadius: "15px",
    padding: "8px 0",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    overflow: "hidden",
  }),

  menuList: (base: any) => ({
    ...base,
    maxHeight: withBorder ? "80px" : "180px",
    padding: "4px",
  }),

  option: (base: any, state: any) => {
    const isShowAll = state.data.value === "";
    const currentValue = state.selectProps.value?.value ?? "";

    return {
      ...base,
      width: "100%",
      borderRadius: "15px",
      padding: "4px 14px",
      cursor: "pointer",
      fontSize: isTablet ? "16px" : "14px",
      textAlign: "left",

      backgroundColor: state.isFocused ? "rgba(246, 184, 61, 0.15)" : "#fff",

      color: isShowAll
        ? currentValue === "" || state.isSelected
          ? "#f6b83d"
          : "rgba(38, 38, 38, 0.6)"
        : state.isSelected
          ? "#f6b83d"
          : "rgba(38, 38, 38, 0.6)",

      "&:active": {
        backgroundColor: "rgba(246, 184, 61, 0.15)",
      },
    };
  },

  indicatorSeparator: () => ({ display: "none" }),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#262626",
    padding: "2px",
  }),

  clearIndicator: (base: any) => ({
    ...base,
    color: "#262626",
    padding: "2px",
  }),
});
