import { OneNews } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import s from "./NewsItem.module.css";

interface NewsItemProps {
  oneNews: OneNews;
}

const NewsItem: React.FC<NewsItemProps> = ({ oneNews }) => {
  return (
    <>
      <img className={s.newsImg} src={oneNews.imgUrl} alt="Items picture" />
      <h3 className={s.itemTitle}>{oneNews.title}</h3>
      <p className={s.text}>{oneNews.text}</p>
      <div className={s.wrapper}>
        <p className={s.date}>{formatDate(oneNews.date)}</p>
        <a className={s.link} href={oneNews.url} target="blank">
          Read more
        </a>
      </div>
    </>
  );
};

export default NewsItem;
