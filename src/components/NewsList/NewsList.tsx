import s from "./NewsList.module.css";
import { OneNews } from "../../utils/types";
import NewsItem from "../NewsItem/NewsItem";

interface NewsListProps {
  news: OneNews[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <ul className={s.newsList}>
      {news.map((item) => (
        <li className={s.newsItem} key={item.id}>
          <NewsItem oneNews={item} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
