export type BookCardProps = {
    _id: string;
    rating: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    description: string;
    pages: number;
    language: string;
    onClick: (id: string) => void;
};

