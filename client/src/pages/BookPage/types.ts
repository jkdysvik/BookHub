import { ReviewProps } from "../../types/ReviewProps";

export type ReviewResponse = {
  bookReviews: ReviewProps[];
};

export type NewReviewProps = {
  bookID: string;
  username: string;
  rating: number;
  review: string;
};

export type ReviewListProps = {
  reviews: { bookReviews: ReviewResponse } | undefined;
};

export type NewReviewFormProps = {
  onSubmit: (event: React.FormEvent) => Promise<void>;
  updateFormState: (newFormState: NewReviewProps) => void;
  toggleNewReview: () => void;
};
