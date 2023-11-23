import { GET_REVIEWS } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { ReviewResponse } from "../pages/BookPage/types";

export default function useGetReviews(bookId?: string) {
  const queryResult = useQuery({
    queryKey: ["review", { bookId }],
    queryFn: async () => {
      const data = await request<{ bookReviews: ReviewResponse }>(
        // Change this to the virtual machine's IP address if pushing to vm
        // "http://it2810-24.idi.ntnu.no:4000/",
        "http://localhost:4000/graphql",
        GET_REVIEWS,
        {
          bookID: bookId,
        },
      );
      return data;
    },
  });
  return queryResult;
}
