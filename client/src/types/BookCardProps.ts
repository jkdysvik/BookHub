export type BookCardProps = {
    _id: string;
    rating: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    onClick: (id: string) => void;
};

