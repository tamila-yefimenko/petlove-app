import s from "./NewsList.module.css";
import { OneNews } from "../../utils/types";
import NewsItem from "../NewsItem/NewsItem";
import { useAppSelector } from "../../redux/hooks";
import { selectIsListLoading } from "../../redux/global/selectors";
import NewsItemSkeleton from "../NewsItemSkeleton/NewsItemSkeleton";

interface NewsListProps {
  news: OneNews[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  const isListLoading = useAppSelector(selectIsListLoading);

  return (
    <ul className={s.newsList}>
      {isListLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <li className={s.newsItem} key={index}>
              <NewsItemSkeleton />
            </li>
          ))
        : news.map((item) => (
            <li className={s.newsItem} key={item.id}>
              <NewsItem oneNews={item} />
            </li>
          ))}
    </ul>
  );
};

export default NewsList;
