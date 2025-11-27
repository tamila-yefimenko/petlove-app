import { Link } from "react-router-dom";
import { OneNews } from "../../redux/news/operations";
import s from "./NewsList.module.css";
import { formatDate } from "../../utils/formatDate";

interface NewsListProps {
  news: OneNews[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <ul className={s.newsList}>
      {news.map((item) => (
        <li className={s.newsItem} key={item.id}>
          <img className={s.newsImg} src={item.imgUrl} alt="Items picture" />
          <h3 className={s.itemTitle}>{item.title}</h3>
          <p className={s.text}>{item.text}</p>
          <div className={s.wrapper}>
            <p className={s.date}>{formatDate(item.date)}</p>
            <Link className={s.link} to={item.url} target="blank">
              Read more
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
