import s from "./NoticesList.module.css";
import { Pet } from "../../utils/types";
import NoticesItem from "../NoticesItem/NoticesItem";
import clsx from "clsx";
import NoticesItemSkeleton from "../NoticesItemSkeleton/NoticesItemSkeleton";

interface NoticesListProps {
  notices: Pet[];
  variant: "notice" | "favorite" | "viewed";
  className?: string;
  itemClassName?: string;
  isLoading?: boolean;
}

const NoticesList: React.FC<NoticesListProps> = ({
  notices,
  variant,
  className,
  itemClassName,
  isLoading = false,
}) => {
  return (
    <ul className={clsx(s.noticesList, className)}>
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <li className={clsx(s.noticesItem, itemClassName)} key={index}>
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
