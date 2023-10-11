export type BookCardProps = {
    rating: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    onClick: (title: string) => void;
};

