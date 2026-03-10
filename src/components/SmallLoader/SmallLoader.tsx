import { Oval } from "react-loader-spinner";

const SmallLoader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#f6b83d"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#f6b83d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default SmallLoader;
