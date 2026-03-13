import clsx from "clsx";
import s from "./PetsItemSkeleton.module.css";

const PetsItemSkeleton: React.FC = () => {
  return (
    <>
      <div className={clsx(s.img, s.skeleton)} />

      <div className={clsx(s.trash, s.skeleton)} />

      <div className={s.wrapper}>
        <div className={clsx(s.title, s.skeleton)} />

        <ul className={s.list}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className={s.item}>
              <div className={clsx(s.subtitle, s.skeleton)} />
              <div className={clsx(s.data, s.skeleton)} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PetsItemSkeleton;
