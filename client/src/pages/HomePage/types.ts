import { BookCardProps } from '../../types/BookCardProps';

export type FrontPageLogoProps = {
    page: number;
    logo_num: number;
    toggleLogo: () => void;
};

export type SelectProps = {
    chosenGenre?: string;
    chosenOrder?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    type: 'genre' | 'order';
};

export type BookCardContainerProps = {
    books: BookCardProps[];
    handleCardClick: (id: string) => void
};
