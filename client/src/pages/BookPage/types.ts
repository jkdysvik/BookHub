import { UseMutationResult } from "@tanstack/react-query";
import { ReviewProps } from "../../types/ReviewProps";

export type NewReviewProps = {
    bookID: string;
    username: string;
    rating: number;
    review: string;
};

export type ReviewListProps = {
    reviews: { reviews: ReviewProps[]; } | undefined;
};

export type NewReviewFormProps = {
    onSubmit: (event: React.FormEvent) => Promise<void>;
    updateFormState: (newFormState: NewReviewProps) => void;
}