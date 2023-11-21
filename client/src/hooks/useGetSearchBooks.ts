import { GET_SEARCH_BOOKS } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { BookCardProps } from "../types/BookCardProps";

export default function useGetSearchBooks(searchQuery?: string, offset?: number, chosenGenre?: string, chosenOrder?: string) {
    const queryResult = useQuery({
        queryKey: ["books", { searchQuery, offset, chosenGenre, chosenOrder } ],
        queryFn: async () => {
            const data = await request<{ books: BookCardProps[] }>(
                "http://localhost:4000/graphql",
                GET_SEARCH_BOOKS,
                {
                    query: searchQuery,
                    limit: 10,
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