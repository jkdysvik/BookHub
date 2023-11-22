import { ReviewProps } from "../../types/ReviewProps";

export type NewReviewProps = {
    bookID: string;
    username: string;
    rating: number;
    review: string;
};

export type ReviewListProps = {
    reviews: ReviewProps[] | undefined;
};