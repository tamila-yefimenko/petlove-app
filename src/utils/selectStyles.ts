export const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "42px",
    width: "100%",
    borderRadius: "30px",
    border: state.isFocused ? "1px solid #f6b83d" : "1px solid transparent",
    boxShadow: "none",
    padding: "0 8px",
    cursor: "pointer",
    backgroundColor: "#fff",

    "&:hover": {
      border: "1px solid #f6b83d",
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
    color: "#262626",
    fontSize: "14px",
    marginLeft: 0,
    textAlign: "left",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#262626",
    fontSize: "14px",
    marginLeft: 0,
    textAlign: "left",
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
    maxHeight: "180px",
    padding: "8px",
  }),

  option: (base: any, state: any) => ({
    ...base,
    width: "100%",
    borderRadius: "15px",
    padding: "10px 12px",
    marginBottom: "4px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "left",

    backgroundColor: state.isFocused ? "rgba(246, 184, 61, 0.15)" : "#fff",

    color: state.isSelected ? "#f6b83d" : "rgba(38, 38, 38, 0.6)",

    "&:active": {
      backgroundColor: "rgba(246, 184, 61, 0.15)",
    },
  }),

  indicatorSeparator: () => ({ display: "none" }),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#262626",
    "&:hover": { color: "#f6b83d" },
  }),

  clearIndicator: (base: any) => ({
    ...base,
    color: "#262626",
    "&:hover": { color: "#f6b83d" },
  }),
};
