import { FC } from "react";
import { SelectProps } from "../types.ts";
import "../HomePage.scss";

const Select: FC<SelectProps> = ({
  chosenGenre,
  chosenOrder,
  onChange,
  type,
}) => {
  return (
    <>
      {type === "genre" && (
        <div>
          <label htmlFor="genreSelect">Select genre:</label>
          <select
            value={chosenGenre}
            id="genreSelect"
            onChange={onChange}
            tabIndex={0}
          >
            <option value="">All</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
            <option value="Historical Fiction">Historical fiction</option>
            <option value="Science">Science</option>
            <option value="Science Fiction">Science fiction</option>
          </select>
        </div>
      )}
      {type === "order" && (
        <div>
          <label htmlFor="orderBySelect">Order by:</label>
          <select
            value={chosenOrder}
            id="orderBySelect"
            data-testid="orderBySelect"
            onChange={onChange}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="rating">Rating</option>
            <option value="year">Year</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Select;
