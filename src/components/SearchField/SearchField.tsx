import { useState } from "react";
import s from "./SearchField.module.css";
import clsx from "clsx";
import toast from "react-hot-toast";

interface SearchFieldProps {
  className?: string;
  onSubmit: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ className, onSubmit }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      toast.error("Please enter a search term!");
      return;
    }

    onSubmit(query);
    setSearch("");
  };

  return (
    <div className={clsx(s.searchWrapper, className)}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          name="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {!!search && (
          <button
            className={s.clearBtn}
            type="button"
            onClick={() => setSearch("")}>
            <svg className={s.clearIcon}>
              <use href="/icons/sprite.svg#icon-x" />
            </svg>
          </button>
        )}

        <button className={s.button} type="submit">
          <svg className={s.icon}>
            <use href="/icons/sprite.svg#icon-search" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchField;
