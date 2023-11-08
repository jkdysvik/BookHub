import { GET_BOOKS } from "../graphql/queries";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { BookCardProps } from "../types/BookCardProps";


export default function useGetBooks(chosenGenre: string) {
    // `data` is fully typed!
    const queryResult = useQuery({
        queryKey: ["book", chosenGenre],
        queryFn: async () => {
            const data = await request<{ books: BookCardProps[] }>(
                "http://localhost:4000/graphql",
                GET_BOOKS,
                {
                    limit: 10,
                    offset: 0,
                    genre: chosenGenre,
                },
            );
            return data;
        },
    });
    return queryResult;
}

