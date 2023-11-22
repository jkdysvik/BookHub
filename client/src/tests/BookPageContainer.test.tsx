import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookCardContainer from "../pages/HomePage/components/BookCardContainer";

const queryClient = new QueryClient();

describe("BookCardContainer Test", () => {
  const mockBook = {
    _id: "4",
    title: "Harry Potter",
    author: "J.K. Rowling",
    year: 1997,
    rating: 4.5,
    genre: "Fantasy",
    description:
      "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
    pages: 223,
    language: "English",
    onClick: () => {},
  };
  const renderHomePage = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BookCardContainer books={[mockBook]} handleCardClick={() => {}} />
      </QueryClientProvider>,
    );
  };

  test("Check book information", async () => {
    renderHomePage();

    expect(screen.getByText(mockBook.title)).toHaveTextContent(mockBook.title);
    expect(screen.getByText(mockBook.author)).toHaveTextContent(
      mockBook.author,
    );
    expect(screen.getByText(mockBook.year.toString())).toHaveTextContent(
      mockBook.year.toString(),
    );
    expect(screen.getByText(mockBook.rating.toString())).toHaveTextContent(
      mockBook.rating.toString(),
    );
    expect(screen.getByText(mockBook.genre)).toHaveTextContent(mockBook.genre);
  });
});
