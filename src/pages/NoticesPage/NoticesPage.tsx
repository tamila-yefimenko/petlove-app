import { useEffect } from "react";
import SearchField from "../../components/SearchField/SearchField";
import Title from "../../components/Title/Title";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import s from "./NoticesPage.module.css";
import { Container } from "../../components/Container/Container";
import Pagination from "../../components/Pagination/Pagination";
import { selectIsLoading } from "../../redux/global/selectors";
import {
  selectError,
  selectNotices,
  selectPage,
  selectQuery,
  selectTotalPages,
} from "../../redux/notices/selectors";
import { resetNotices, setQuery } from "../../redux/notices/slice";
import { fetchNotices } from "../../redux/notices/operations";
import NoticesList from "../../components/NoticesList/NoticesList";
import { setPage } from "../../redux/notices/slice";

const NoticesPage: React.FC = () => {
  const notices = useAppSelector(selectNotices);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const totalPages = useAppSelector(selectTotalPages);
  const query = useAppSelector(selectQuery);
  const page = useAppSelector(selectPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotices({ page: 1, keyword: query }));
  }, [dispatch, query]);

  const hasNews = notices.length > 0;

  const handleSearch = (value: string) => {
    dispatch(resetNotices());
    dispatch(setQuery(value.toLowerCase()));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(fetchNotices({ page: newPage, keyword: query }));
  };

  return (
    <div className={s.noticesPage}>
      <Container className={s.noticesContainer}>
        <div className={s.wrapper}>
          {!isLoading && (
            <Title className={s.title}>Find your favorite pet</Title>
          )}
          {!isLoading && (
            <SearchField className={s.search} onSubmit={handleSearch} />
          )}
        </div>
        {hasNews && <NoticesList notices={notices} />}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={handlePageChange}
          />
        )}
        {error && <p>error</p>}
      </Container>
    </div>
  );
};

export default NoticesPage;
