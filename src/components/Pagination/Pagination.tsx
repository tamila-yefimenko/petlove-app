import clsx from "clsx";
import { useAppSelector, useWindowWidth } from "../../redux/hooks";
import { selectPage } from "../../redux/news/selectors";
import s from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onChange }) => {
  const currentPage = useAppSelector(selectPage);
  const width = useWindowWidth();

  const count = width < 768 ? 2 : 3;
  const pagesToShow: number[] = [currentPage];

  let next = 1;
  while (pagesToShow.length < count && currentPage + next <= totalPages) {
    pagesToShow.push(currentPage + next);
    next++;
  }

  let prev = 1;
  while (pagesToShow.length < count && currentPage - prev >= 1) {
    pagesToShow.unshift(currentPage - prev);
    prev++;
  }

  const setActiveClass = (page: number) =>
    clsx(s.item, page === currentPage && s.active);

  return (
    <div className={s.pagination}>
      <div className={s.arrowWrapper}>
        <button
          type="button"
          disabled={currentPage === 1}
          className={clsx(s.item, s.double)}
          onClick={() => onChange(1)}>
          <svg className={s.icon}>
            <use href="./icons/sprite.svg#icon-fi-rr-angle-small-left" />
          </svg>
          <svg className={clsx(s.icon, s.right)}>
            <use href="./icons/sprite.svg#icon-fi-rr-angle-small-left" />
          </svg>
        </button>
        <button
          type="button"
          disabled={currentPage === 1}
          className={s.item}
          onClick={() => onChange(currentPage - 1)}>
          <svg className={s.icon}>
            <use href="./icons/sprite.svg#icon-fi-rr-angle-small-left" />
          </svg>
        </button>
      </div>

      <div className={s.numberWrapper}>
        {pagesToShow.map((page) => (
          <button
            key={page}
            type="button"
            className={setActiveClass(page)}
            onClick={() => onChange(page)}>
            {page}
          </button>
        ))}

        {pagesToShow[pagesToShow.length - 1] < totalPages && (
          <span className={s.dots}>...</span>
        )}
      </div>

      <div className={s.arrowRightWrapper}>
        <button
          type="button"
          className={s.item}
          onClick={() => onChange(currentPage + 1)}>
          <svg className={s.icon}>
            <use href="./icons/sprite.svg#icon-fi-rr-angle-small-left-2" />
          </svg>
        </button>

        <button
          type="button"
          className={clsx(s.item, s.double)}
          onClick={() => onChange(totalPages)}>
          <svg className={s.icon}>
            <use href="./icons/sprite.svg#icon-fi-rr-angle-small-left-2" />
          </svg>
          <svg className={clsx(s.icon, s.right)}>
            <use href="./icons/sprite.svg#icon-fi-rr-angle-small-left-2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
