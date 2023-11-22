import { CREATE_REVIEW } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { ReviewProps } from "../types/ReviewProps";

export default function useCreateReviews(
  bookId?: string,
  username?: string,
  rating?: number,
  review?: string,
) {
  const queryResult = useQuery({
    queryKey: ["review", bookId, username, rating, review],
    queryFn: async () => {
      const data = await request<{ reviews: ReviewProps[] }>(
        // Change this to the virtual machine's IP address if pushing to vm
        // "http://it2810-24.idi.ntnu.no:4000/",
        "http://localhost:4000/graphql",
        CREATE_REVIEW,
        {
          createReviewInput: {
            bookID: bookId,
            username: username,
            rating: rating,
            review: review,
          },
        },
      );
      return data;
    },
  });
  return queryResult;
}
