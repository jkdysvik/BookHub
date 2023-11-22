import { FC } from "react";
import { PaginationProps } from "../types.ts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../HomePage.scss";

const Pagination: FC<PaginationProps> = ({
  offset,
  limit,
  setOffset,
  booksLen,
}) => {
  return (
    <div className="homepage-scrolling-container">
      {offset >= limit && (
        <button
          data-testid="previousId"
          className="homepage-scroll-button"
          onClick={() => setOffset(offset - limit)}
        >
          <ArrowBackIcon fontSize="small" />
          Previous
        </button>
      )}
      <div className="homepage-index">{Math.floor(offset / limit)}</div>
      {booksLen === limit && (
        <button
          data-testid="nextId"
          className="homepage-scroll-button"
          onClick={() => setOffset(offset + limit)}
        >
          Next <ArrowForwardIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
