import { useEffect } from "react";
import Title from "../../components/Title/Title";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import s from "./NoticesPage.module.css";
import { Container } from "../../components/Container/Container";
import Pagination from "../../components/Pagination/Pagination";
import { selectIsLoading } from "../../redux/global/selectors";
import {
  selectError,
  selectNotices,
  selectTotalPages,
} from "../../redux/notices/selectors";
import { fetchNotices } from "../../redux/notices/operations";
import NoticesList from "../../components/NoticesList/NoticesList";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import { selectFiltersForFetch } from "../../redux/noticesFilters/selectors";
import { setPage } from "../../redux/noticesFilters/slice";

const NoticesPage: React.FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const totalPages = useAppSelector(selectTotalPages);
  const notices = useAppSelector(selectNotices);

  const hasNotices = notices.length > 0;

  const dispatch = useAppDispatch();

  const {
    keyword,
    category,
    species,
    sex,
    locationId,
    byPopularity,
    byPrice,
    page,
  } = useAppSelector(selectFiltersForFetch);

  useEffect(() => {
    dispatch(
      fetchNotices({
        keyword,
        category,
        species,
        sex,
        locationId,
        byPopularity,
        byPrice,
        page,
      }),
    );
  }, [
    keyword,
    category,
    species,
    sex,
    locationId,
    byPopularity,
    byPrice,
    page,
  ]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className={s.noticesPage}>
      <Container className={s.noticesContainer}>
        <div className={s.wrapper}>
          {!isLoading && (
            <Title className={s.title}>Find your favorite pet</Title>
          )}
          {!isLoading && (
            <div className={s.searchWrapper}>
              <NoticesFilters />
            </div>
          )}
        </div>
        {hasNotices && <NoticesList notices={notices} variant="notice" />}
        {!hasNotices && (
          <div className={s.noWrapper}>
            <p className={s.noResults}>No results found.</p>
            <p className={s.text}>Try changing your search parameters.</p>
          </div>
        )}
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
