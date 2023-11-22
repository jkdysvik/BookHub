import { GET_BOOK } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { BookCardProps } from "../types/BookCardProps";

export default function useGetBook(bookId?: string) {
  const queryResult = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const data = await request<{ book: BookCardProps }>(
        "http://localhost:4000/graphql",
        GET_BOOK,
        {
          id: bookId,
        },
      );
      return data;
    },
  });
  return queryResult;
}
