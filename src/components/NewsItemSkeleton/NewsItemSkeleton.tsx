import clsx from "clsx";
import s from "./NewsItemSkeleton.module.css";

const NewsItemSkeleton: React.FC = () => {
  return (
    <>
      <div className={clsx(s.img, s.skeleton)} />

      <div className={clsx(s.title, s.skeleton)} />

      <div className={clsx(s.text, s.skeleton)} />

      <div className={s.wrapper}>
        <div className={clsx(s.date, s.skeleton)} />
        <div className={clsx(s.link, s.skeleton)} />
      </div>
    </>
  );
};

export default NewsItemSkeleton;
