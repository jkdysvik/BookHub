import { GET_BOOKS } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { BookCardProps } from "../types/BookCardProps";

export default function useGetBooks(
  offset: number,
  chosenGenre: string,
  chosenOrder: string,
  limit: number,
) {
  const queryResult = useQuery({
    queryKey: ["book", { offset, chosenGenre, chosenOrder, limit }],
    queryFn: async () => {
      const data = await request<{ books: BookCardProps[] }>(
        // Change this to the virtual machine's IP address if pushing to vm
        // "http://it2810-24.idi.ntnu.no:4000/",
        "http://localhost:4000/graphql",
        GET_BOOKS,
        {
          limit: limit,
          offset: offset,
          genre: chosenGenre,
          orderBy: chosenOrder,
        },
      );
      return data;
    },
  });
  return queryResult;
}
