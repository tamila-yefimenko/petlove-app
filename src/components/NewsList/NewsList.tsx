import s from "./NewsList.module.css";
import { OneNews } from "../../utils/types";
import NewsItem from "../NewsItem/NewsItem";
import SmallLoader from "../SmallLoader/SmallLoader";
import { useAppSelector } from "../../redux/hooks";
import { selectIsListLoading } from "../../redux/global/selectors";
import clsx from "clsx";

interface NewsListProps {
  news: OneNews[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  const isListLoading = useAppSelector(selectIsListLoading);

  return (
    <ul className={clsx(s.newsList, isListLoading && s.loaderList)}>
      {isListLoading ? (
        <li className={s.loaderItem}>
          <SmallLoader />
        </li>
      ) : (
        news.map((item) => (
          <li className={s.newsItem} key={item.id}>
            <NewsItem oneNews={item} />
          </li>
        ))
      )}
    </ul>
  );
};

export default NewsList;
