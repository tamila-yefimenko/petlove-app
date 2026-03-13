import s from "./NoticesList.module.css";
import { Pet } from "../../utils/types";
import NoticesItem from "../NoticesItem/NoticesItem";
import clsx from "clsx";
import { useAppSelector } from "../../redux/hooks";
import { selectIsListLoading } from "../../redux/global/selectors";
import NoticesItemSkeleton from "../NoticesItemSkeleton/NoticesItemSkeleton";

interface NoticesListProps {
  notices: Pet[];
  variant: "notice" | "favorite" | "viewed";
  className?: string;
  itemClassName?: string;
}

const NoticesList: React.FC<NoticesListProps> = ({
  notices,
  variant,
  className,
  itemClassName,
}) => {
  const isListLoading = useAppSelector(selectIsListLoading);

  return (
    <ul className={clsx(s.noticesList, className)}>
      {isListLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <li className={s.noticesItem} key={index}>
              <NoticesItemSkeleton />
            </li>
          ))
        : notices.map((pet) => (
            <li className={clsx(s.noticesItem, itemClassName)} key={pet._id}>
              <NoticesItem pet={pet} variant={variant} />
            </li>
          ))}
    </ul>
  );
};

export default NoticesList;
