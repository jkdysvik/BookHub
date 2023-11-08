import { GET_BOOKS } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { BookCardProps } from "../types/BookCardProps";


export default function useGetBooks(offset: number, chosenGenre: string) {
    const queryResult = useQuery({
        queryKey: ["book", { offset, chosenGenre }],
        queryFn: async () => {
            const data = await request<{ books: BookCardProps[] }>(
                "http://localhost:4000/graphql",
                GET_BOOKS,
                {
                    limit: 10,
                    offset: offset,
                    genre: chosenGenre,
                },
            );
            return data;
        },
    });
    return queryResult;
}

