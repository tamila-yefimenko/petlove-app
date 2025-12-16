import { components, OptionProps } from "react-select";

const HighlightOption = (props: OptionProps<any>) => {
  const label = String(props.data.label);
  const input = props.selectProps.inputValue as string;

  if (!input) {
    return <components.Option {...props}>{label}</components.Option>;
  }

  const lowerInput = input.toLowerCase();

  return (
    <components.Option {...props}>
      {label
        .split(new RegExp(`(${input})`, "i"))
        .map((part: string, i: number) =>
          part.toLowerCase() === lowerInput ? (
            <span key={i} style={{ color: "#262626", fontWeight: 500 }}>
              {part}
            </span>
          ) : (
            <span key={i} style={{ color: "rgba(38,38,38,0.5)" }}>
              {part}
            </span>
          )
        )}
    </components.Option>
  );
};

export default HighlightOption;
