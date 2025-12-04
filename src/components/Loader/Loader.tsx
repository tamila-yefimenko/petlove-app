import { useEffect, useState } from "react";
import s from "./Loader.module.css";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";

const Loader: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [value, setValue] = useState(0);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLogo(true);
      setValue(80);

      const timeout = setTimeout(() => {
        setShowLogo(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading || showLogo) return;

    const id = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(id);
  }, [isLoading, showLogo]);

  return (
    <div className={s.loader}>
      <div className={s.bg}></div>
      <div className={showLogo ? s.logoVisible : s.logoHidden}>
        <span className={s.span}>petl</span>
        <svg className={s.icon}>
          <use href="/icons/sprite.svg#icon-heart-circle" />
        </svg>
        <span className={s.span}>ve</span>
      </div>

      <div className={!showLogo ? s.loaderVisible : s.loaderHidden}>
        <ProgressCircle value={value} />
      </div>
    </div>
  );
};
export default Loader;
