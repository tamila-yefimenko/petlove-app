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
  selectFilteredNotices,
  selectNotices,
  // selectPage,
  selectQuery,
  selectTotalPages,
} from "../../redux/notices/selectors";
import { fetchNotices } from "../../redux/notices/operations";
import NoticesList from "../../components/NoticesList/NoticesList";
// import { setPage } from "../../redux/notices/slice";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import {
  selectFiltersForFetch,
  selectPage,
} from "../../redux/noticesFilters/selectors";
import { setPage } from "../../redux/noticesFilters/slice";

const NoticesPage: React.FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const totalPages = useAppSelector(selectTotalPages);
  const page = useAppSelector(selectPage);
  const filteredNotices = useAppSelector(selectFilteredNotices);

  const dispatch = useAppDispatch();

  const { keyword, category, species, sex, locationId, byPopularity, byPrice } =
    useAppSelector(selectFiltersForFetch);

  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [keyword, category, species, sex, locationId, byPopularity, byPrice]);

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
      })
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

  const hasNotices = filteredNotices.length > 0;

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
        {hasNotices && <NoticesList notices={filteredNotices} />}
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
