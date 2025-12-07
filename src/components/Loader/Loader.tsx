import { useEffect, useState } from "react";
import s from "./Loader.module.css";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";

const Loader: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [value, setValue] = useState(70);
  const [visible, setVisible] = useState(false);

  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setShowLogo(true);
      setValue(70);

      const t = setTimeout(() => {
        setShowLogo(false);
      }, 300);

      return () => clearTimeout(t);
    }

    if (!isLoading) {
      const t = setTimeout(() => {
        setVisible(false);
        setValue(70);
        setShowLogo(true);
      }, 400);

      return () => clearTimeout(t);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showLogo || !isLoading) return;

    const id = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(id);
  }, [showLogo, isLoading]);

  if (!visible) return null;

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
