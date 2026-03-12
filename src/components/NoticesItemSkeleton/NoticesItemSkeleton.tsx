import clsx from "clsx";
import s from "./NoticesItemSkeleton.module.css";

const NoticesItemSkeleton: React.FC = () => {
  return (
    <>
      <div className={clsx(s.img, s.skeleton)} />

      <div className={s.titleWrapper}>
        <div className={clsx(s.title, s.skeleton)} />
        <div className={clsx(s.pop, s.skeleton)} />
      </div>

      <ul className={s.info}>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className={clsx(s.infoItem, s.skeleton)} />
        ))}
      </ul>

      <div className={clsx(s.comment, s.skeleton)} />

      <div className={clsx(s.price, s.skeleton)} />

      <div className={s.btnWrapper}>
        <div className={clsx(s.button, s.skeleton)} />
        <div className={clsx(s.heart, s.skeleton)} />
      </div>
    </>
  );
};

export default NoticesItemSkeleton;
