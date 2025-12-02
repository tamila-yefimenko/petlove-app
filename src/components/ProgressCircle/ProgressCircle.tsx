import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useWindowWidth } from "../../redux/hooks";
import s from "./ProgressCircle.module.css";

interface Props {
  value: number;
}

const ProgressCircle: React.FC<Props> = ({ value }) => {
  const width = useWindowWidth();

  const isTablet = width >= 768;

  const size = isTablet ? 396 : 270;
  const fontSize = isTablet ? 23 : 20;

  return (
    <div
      className={s.wrapper}
      style={{
        width: size,
        height: size,
      }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={1}
        styles={buildStyles({
          pathColor: "#fff",
          trailColor: "rgba(255,255,255,0.2)",
          textColor: "#fff",
          textSize: `${fontSize}px`,
          pathTransitionDuration: 0.6,
        })}
      />
    </div>
  );
};

export default ProgressCircle;
