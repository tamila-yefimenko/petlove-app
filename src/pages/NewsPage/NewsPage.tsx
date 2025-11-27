import { useEffect, useState } from "react";
import NewsList from "../../components/NewsList/NewsList";
import SearchField from "../../components/SearchField/SearchField";
import Title from "../../components/Title/Title";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectError,
  selectIsLoading,
  selectLimit,
  selectNews,
  selectPage,
  selectQuery,
  selectTotalPages,
} from "../../redux/news/selectors";
import s from "./NewsPage.module.css";
import { fetchNews } from "../../redux/news/operations";
import { resetNews, setQuery } from "../../redux/news/slice";
import { Container } from "../../components/Container/Container";

const NewsPage: React.FC = () => {
  const news = useAppSelector(selectNews);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);
  const query = useAppSelector(selectQuery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNews({ page: 1, keyword: query }));
  }, [dispatch, query]);

  const hasNews = news.length > 0;

  const handleSearch = (value: string) => {
    dispatch(resetNews());
    dispatch(setQuery(value.toLowerCase()));
  };

  const handleLoadMore = () => {
    if (page <= totalPages) {
      dispatch(fetchNews({ page, keyword: query }));
    }
  };

  return (
    <div className={s.newsPage}>
      <Container className={s.newsContainer}>
        <div className={s.wrapper}>
          {!isLoading && <Title className={s.title}>News</Title>}
          {!isLoading && (
            <SearchField className={s.search} onSubmit={handleSearch} />
          )}
        </div>
        {hasNews && <NewsList news={news} />}
        {page <= totalPages && !isLoading && news.length > 0 && (
          <button className={s.loadMore} onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {error && <p>error</p>}
      </Container>
    </div>
  );
};

export default NewsPage;
