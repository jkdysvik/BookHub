import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewReviewForm from "../pages/BookPage/components/NewReviewForm";
import ReviewList from "../pages/BookPage/components/ReviewList";
import { ReviewResponse } from "../pages/BookPage/types";
import { ReviewProps } from "../types/ReviewProps";
import { ReviewListProps } from "../pages/BookPage/types";
import { fn } from "jest-mock";

let mockDataReviews: ReviewListProps['reviews'] = {
    bookReviews: [
      {
        _id: "1",
        bookID: "book3",
        username: "user1",
        rating: 5,
        review: "Great book!"
      },
    ]
  };
  
  const addReview = (newReview: ReviewProps) => {
    mockDataReviews?.bookReviews.push(newReview);
  };

  const mockUpdateFormState = fn();

describe("NewReviewForm Test", () => {


    test("reviews are shown on screen", async () => {
        render(<ReviewList reviews={mockDataReviews} />);
        await waitFor(() => {
            expect(screen.getByText("Great book!")).toBeInTheDocument();
          });

       
    });
    test("adds a new review and checks if it's displayed in the list", async () => {
        render(
          <>
            <NewReviewForm addReview={addReview} updateFormState={mockUpdateFormState}/>
            <ReviewList reviews={ mockDataReviews } />
          </>
        );
    
       
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "user2" } });
        fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: "4" } });
        fireEvent.change(screen.getByLabelText(/review/i), { target: { value: "Good book!" } });
        const form = screen.getByTestId('formTest'); 
        fireEvent.submit(form);

        await waitFor(() => {
          expect(screen.getByText("Good book!")).toBeInTheDocument();
        });
      });
});
